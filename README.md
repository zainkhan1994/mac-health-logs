# 🩺 mac-health-logs

A collection of automated macOS system health reports that monitor and track your Mac's performance, resource usage, and system status over time.

## 📊 What's Inside

This repository contains periodic snapshots of system health metrics including:

- **System Uptime**: How long the system has been running
- **Memory Usage**: RAM consumption and recommendations
- **Disk Space**: Available storage capacity
- **Internet Connectivity**: Network status checks
- **Application Crashes**: System stability monitoring
- **Startup Items**: Number of launch items
- **Battery Status**: Current charge level
- **FileVault Status**: Disk encryption status
- **CPU-Intensive Processes**: Top 5 resource-consuming applications

## 📖 Understanding the Reports

Each health report file follows this naming pattern: `Health_Report_YYYY-MM-DD_HH-MM.txt`

### Report Metrics Explained

| Metric | Description | Status Indicators |
|--------|-------------|-------------------|
| 🕒 **Uptime** | Time since last restart | ✅ No restart needed / ⚠️ Consider restarting |
| 🧠 **Memory** | Available RAM | ✅ Plenty of memory / ⚠️ Close some apps |
| 💾 **Disk Space** | Free storage | ✅ Plenty of space / ⚠️ Running low |
| 🌐 **Internet** | Network connectivity | ✅ Connected / ❌ No connection! |
| 📦 **Crashes** | Recent app crashes | ✅ No issues / ⚠️ Crashes detected |
| ⚙️ **Startup Items** | Number of launch items | ✅ Normal range / ⚠️ Too many items |
| 🔋 **Battery** | Current charge level | Percentage remaining |
| 🔒 **FileVault** | Encryption status | On / Off |

### Sample Report

```
🩺 System Health Report – 2025-06-08

🕒 Uptime:  2:59 ✅ No restart needed.
🧠 Memory: 15 MB ⚠️ Close some apps.
💾 Disk Space: 16 GB free ✅ Plenty of space.
🌐 Internet: Ping OK ✅ Connected.
📦 Crashes: None ✅ No issues.
⚙️ Startup Items:        6 ✅ Normal range.
🔋 Battery: 100% remaining.
🔒 FileVault: FileVault is Off.

🔥 Top 5 CPU-consuming apps:
    76.5 /System/Library/PrivateFrameworks/FileProvider.framework/Support/fileproviderd
    43.1 /System/Library/PrivateFrameworks/SkyLight.framework/Resources/WindowServer -daemon
    23.8 /Applications/Rewind.app/Contents/MacOS/Rewind
    23.8 /Applications/Google Chrome.app/Contents/MacOS/Google Chrome
    22.2 /System/Library/PrivateFrameworks/StorageManagement.framework/...

🎯 Recommendations:
   - Consider closing memory-hungry apps.
```

## 🎯 Use Cases

- **Performance Tracking**: Monitor system resource usage trends over time
- **Troubleshooting**: Identify resource-intensive applications causing slowdowns
- **Maintenance Planning**: Determine when to restart, free up space, or optimize startup items
- **Historical Analysis**: Review past system states for debugging or auditing

## 📈 Analyzing Trends

Look through multiple reports to identify patterns:
- Consistent memory warnings may indicate a memory leak
- Frequently appearing processes in CPU list may need optimization
- Battery drain patterns can help identify power-hungry apps
- Internet connectivity issues can be correlated with specific times

## 🔍 Common Issues & Solutions

| Warning | Potential Cause | Recommended Action |
|---------|----------------|-------------------|
| ⚠️ Close some apps | High memory usage | Quit unused applications |
| ⚠️ Running low | Low disk space | Delete unnecessary files, empty Trash |
| ❌ No connection! | Network issues | Check Wi-Fi, router, or ISP |
| Multiple crashes | System instability | Update macOS, check Console.app logs |

## 📝 Report Generation

These reports are automatically generated to track system health. Each report provides a snapshot of the system's current state at the time of generation.

## 🤝 Contributing

If you'd like to improve the health monitoring script or add new metrics, feel free to open an issue or submit a pull request.

## 📜 License

This repository contains personal system health logs for monitoring and analysis purposes.
