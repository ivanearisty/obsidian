## Ships

[[Feb17]]
## Tasks
```dataview
TASK
WHERE !completed and (file.folder = "Weeks/Archive" or file.folder = "Weeks/Active")
GROUP BY file.folder AS Folder
FLATTEN file.link AS Name
SORT Order ASC
```

