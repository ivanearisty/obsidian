---
tags:
  - Lava
---

https://developer.apple.com/documentation/Observation
## Observation in Swift

Observation provides a robust, type-safe, and performant implementation of the observer design pattern in Swift. This pattern allows an observable object to maintain a list of observers and notify them of specific or general state changes. The advantages include:

- **Decoupling objects**: Objects are not directly coupled together.
- **Implicit distribution**: Updates can be distributed across multiple observers.

### Capabilities of the Observation Framework

- **Marking a type as observable**
- **Tracking changes within an instance of an observable type**
- **Observing and utilizing those changes elsewhere, such as in an app’s user interface**

### Declaring a Type as Observable

To declare a type as observable, attach the `Observable()` macro to the type declaration. This macro declares and implements conformance to the `Observable` protocol for the type at compile time.

```swift
@Observable
class Car {
    var name: String = ""
    var needsRepairs: Bool = false
    
    init(name: String, needsRepairs: Bool = false) {
        self.name = name
        self.needsRepairs = needsRepairs
    }
}
```
### Tracking Changes

To track changes, use the `withObservationTracking(_:onChange:)` function. In the example below, the function calls the `onChange` closure when a car’s `name` changes. It doesn’t call the closure when a car’s `needsRepairs` flag changes because the function only tracks properties read in its `apply` closure, and the closure doesn’t read the `needsRepairs` property.

```swift
func render() {
    withObservationTracking {
        for car in cars {
            print(car.name)
        }
    } onChange: {
        print("Schedule renderer.")
    }
}
```

### Topics

#### Observable Conformance

- **macro `Observable()`**  
  Defines and implements conformance of the `Observable` protocol.

- **protocol `Observable`**  
  A type that emits notifications to observers when underlying data changes.

#### Change Tracking

- **func `withObservationTracking<T>(() -> T, onChange: @autoclosure () -> () -> Void) -> T`**  
  Tracks access to properties.

- **struct `ObservationRegistrar`**  
  Provides storage for tracking and access to data changes.

#### Observation in SwiftUI

- **Managing model data in your app**  
  Create connections between your app’s data model and views.

- **Migrating from the `ObservableObject` protocol to the `Observable` macro**  
  Update your existing app to leverage the benefits of Observation in Swift.

#### Macros

- **macro `ObservationIgnored()`**  
  Disables observation tracking of a property.

- **macro `ObservationTracked()`**  
  Synthesizes a property for accessors.