# AttendEase: A Simple Web-Based Attendance Tally System

**AttendEase** is a lightweight web application designed to record, tally, and manage student attendance efficiently.  
It provides a simple, browser-based interface where teachers or class representatives can mark attendance and save records into a MySQL database.

---

## Features

- Display list of students  
- Mark students as **Present** or **Absent**  
- Automatically calculate attendance summary  
- Store attendance records in a **MySQL database**  
- Simple, clean, and responsive user interface  
- Works locally using **LAMPP (XAMPP for Linux)**  

---

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript
- **Backend**: PHP
- **Database**: MySQL
- **Server**: Apache (via XAMPP / LAMPP)
- **OS**: Linux Mint

## Install XAMPP

Visit [XAMPP](https://www.apachefriends.org/) and follow the installation.

```bash
cd ~/Downloads
chmod +x xampp-linux-x64-*.run
sudo ./xampp-linux-x64-*.run
```

### Start Apache and MySQL

```bash
sudo /opt/lampp/lampp start
```

If you encounter an error like this:
```bash
Starting XAMPP for Linux 8.2.12-0...
XAMPP: Starting Apache...fail.
XAMPP:  Another web server is already running.
XAMPP: Starting MySQL...ok.
XAMPP: Starting ProFTPD...ok.
```
Just type this command:
```bash
# Stop the running service
sudo systemctl stop apache2

# Then re-run the command
sudo /opt/lampp/lampp start
```

Clone this repository inside **/opt/lampp/htdocs**

```bash
cd /opt/lampp/htdocs
git clone https://github.com/Wacky-sama/AttendEase.git
sudo chown -R $USER:$USER AttendEase
```
