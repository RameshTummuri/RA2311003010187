## Notification System Design

## Approach
- Fetch notifications from external API
- Sort based on priority:
  Placement > Result > Event
- If same type → sort by latest timestamp
- Return top 10 notifications

## Time Complexity
- Sorting: O(n log n)

## Logging
- Implemented reusable logging middleware
- Used in:
  - Backend (API calls, errors)
  - Frontend (UI events, API calls)

## Improvements
- Can use priority queue for better performance

# Notification System

## Desktop View
![Desktop](./screenshots/desktop.png)

## Mobile View
![Mobile](./screenshots/mobile.png)