#### Best Practice: Add Context to Your `Photo` Entity

A single `Photo` should be associated with only one "thing" at a time. To achieve this, you can add nullable foreign keys to your `Photo` entity.

**Updated `WBB/src/main/java/WeB0nd/WBB/Domain/Entity/Photo.java`:**

```java
// ... imports
@Entity
@Table(name = "photo", schema = "wbcore")
@Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor
public class Photo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "photo_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private UserAccount owner;

    // --- NEW: Add a nullable foreign key to Activity ---
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "activity_id", nullable = true) // This photo can optionally belong to an activity
    private Activity activity;

    // --- Note: The existing profile photo link is on the UserAccount entity, which is also fine.
    // This design means a photo is either a generic photo (owned by a user),
    // a photo for an activity, OR it is linked as a profile photo.

    @Column(name = "gcs_bucket_name", nullable = false)
    private String gcsBucketName;

    // ... other fields remain the same ...
}
```
You will also need to update your `Activity` entity to have a list of photos.

**Updated `WBB/src/main/java/WeB0nd/WBB/Domain/Entity/Activity.java`:**
```java
//...
public class Activity {
    //...

    @OneToMany(mappedBy = "activity", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Photo> photos = new ArrayList<>();

    //...
}
```

### 3. Workflow for Uploading Activity Photos

Here is the step-by-step best practice workflow for a user uploading a photo for an activity.

#### Step 1: Client Requests an Upload URL (with Context)

The client needs to tell the backend what the photo is for.

**API Endpoint Evolution**:
The `generate-upload-url` endpoint should be updated to accept a context.

`POST /photos/generate-upload-url`

**Request Parameters:**
*   `fileName` (String)
*   `contentType` (String)
*   `context` (String enum: "ACTIVITY", "PROFILE\_PHOTO", etc.)
*   `contextId` (Long, optional): The ID of the activity (e.g., `123`).

**Updated `PhotoController.java`:**
```java
@PostMapping("/generate-upload-url")
public ResponseEntity<HttpResponse> generateUploadUrl(
        @RequestParam("fileName") String fileName,
        @RequestParam("contentType") String contentType,
        @RequestParam("context") String context, // "ACTIVITY"
        @RequestParam(value = "contextId", required = false) Long contextId, // The ID of the activity
        Authentication authentication) {

    UserAccount currentUser = (UserAccount) authentication.getPrincipal();

    try {
        // Delegate to the service, which now includes authorization logic
        StorageService.SignedUploadUrlResponse response = photoService.generateUploadUrl(currentUser, fileName, contentType, context, contextId);

        // ... return successful response ...
    } catch (Exception e) {
        // ... return error response ...
    }
}
```
**Updated `PhotoService` Interface and Implementation:**
Your `PhotoService` would now contain authorization logic. Before generating a URL, it must verify the user's permissions.

```java
// In PhotoServiceImpl.java
public StorageService.SignedUploadUrlResponse generateUploadUrl(UserAccount user, String fileName, String contentType, String context, Long contextId) {
    // === AUTHORIZATION LOGIC ===
    if ("ACTIVITY".equals(context)) {
        if (contextId == null) {
            throw new IllegalArgumentException("An activity ID is required for the ACTIVITY context.");
        }
        // Check if the user is allowed to add a photo to this activity
        // (e.g., are they the creator or an attendee?)
        validateUserCanModifyActivity(user, contextId);
    }
    // else if ("PROFILE_PHOTO".equals(context)) { /* No extra auth needed */ }
    else {
        throw new IllegalArgumentException("Invalid upload context provided.");
    }
    // ===========================

    // If authorization passes, proceed with generating the URL
    return storageService.generateSignedUploadUrl(fileName, contentType);
}

private void validateUserCanModifyActivity(UserAccount user, Long activityId) {
    // TODO: Implement logic here. For example:
    // 1. Fetch the activity by activityId.
    // 2. Check if activity.getCreator().getId().equals(user.getId()).
    // 3. If not, maybe check if they are an attendee.
    // 4. If they don't have permission, throw an AccessDeniedException.
    log.info("User {} is authorized to upload to activity {}", user.getId(), activityId);
}
```

#### Step 2: Client Uploads Directly to GCS

This step remains the same. The client receives the signed URL and `objectName` and performs the `PUT` request to Google Cloud Storage.

#### Step 3: Client Notifies Server of Completion (with Context)

The `upload-complete` endpoint also needs the context to correctly associate the new photo.

**API Endpoint Evolution**:
`POST /photos/upload-complete`

**Request Parameters:**
*   `objectName` (String)
*   `fileName` (String)
*   `contentType` (String)
*   `fileSize` (Long)
*   `context` (String enum: "ACTIVITY", "PROFILE\_PHOTO")
*   `contextId` (Long, optional)

**Updated `PhotoController.java` and `PhotoServiceImpl.java`**:
The `completeUpload` method in your service will now have a `switch` or `if/else` block to handle the different contexts.

```java
// In PhotoServiceImpl.java
@Override
public Photo completeUpload(UserAccount user, String objectName, String fileName, String contentType, Long fileSize, String context, Long contextId) {
    log.info("Completing upload for user ID: {} with object name: {} for context: {}", user.getId(), objectName, context);

    Photo photo = Photo.builder()
            .owner(user)
            .gcsBucketName(storageService.getBucketName())
            .gcsObjectName(objectName)
            .contentType(contentType)
            .fileSize(fileSize)
            .build();

    // === CONTEXT-SPECIFIC LOGIC ===
    switch (context) {
        case "PROFILE_PHOTO":
            // This reuses your existing logic for setting a profile photo
            setAsProfilePhoto(user, photo);
            break;
        case "ACTIVITY":
            if (contextId == null) {
                throw new IllegalArgumentException("An activity ID is required for the ACTIVITY context.");
            }
            // Find the activity and associate the photo
            Activity activity = activityRepository.findById(contextId)
                    .orElseThrow(() -> new EntityNotFoundException("Activity not found with ID: " + contextId));
            photo.setActivity(activity);
            break;
        default:
            throw new IllegalArgumentException("Invalid upload context provided.");
    }
    // =============================

    Photo savedPhoto = photoRepository.save(photo);
    log.info("Saved photo metadata to database with ID: {}", savedPhoto.getId());
    return savedPhoto;
}

// Extracted helper method for setting profile photo to reduce duplication
private void setAsProfilePhoto(UserAccount user, Photo newPhoto) {
    UserAccount managedUser = userAccountRepository.findById(user.getId())
            .orElseThrow(() -> new EntityNotFoundException("User not found with ID: " + user.getId()));

    if (managedUser.getProfilePhoto() != null) {
        log.info("User {} has an existing profile photo. Deleting old file from GCS.", user.getId());
        storageService.deleteFile(managedUser.getProfilePhoto().getGcsObjectName());
    }

    managedUser.setProfilePhoto(newPhoto);
    userAccountRepository.save(managedUser);
    log.info("Successfully associated photo {} as profile photo for user {}", newPhoto.getId(), managedUser.getId());
}
```