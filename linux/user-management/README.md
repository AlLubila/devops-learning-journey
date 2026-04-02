# User Management & Permissions – Linux Environment Simulation

## Context

This project shows how I designed, audited, and secured a multi-user Linux environment with role-based access control.  

The starting system was deliberately misconfigured, similar to real-world scenarios:  
- unnecessary or dangerous users  
- inconsistent groups  
- overly permissive permissions (777)  
- admin rights given incorrectly  
- no clear separation between developers, ops, and managers  

The goal was to analyze this environment, identify the issues, and make it clean, secure, and reproducible.

---

## Initial Audit

Key problems I found:  
- `tempuser` was unnecessary  
- `dev2` had sudo access without justification  
- groups like `team` and `testgroup` made no sense  
- critical directories (`/projects`, `/secure`, `/shared`, `/tmp`) were accessible to everyone  
- no clear role separation or enforced permissions  

---

## Roles and Design

I defined roles following the principle of least privilege:  

- Developers (`dev1`, `dev2`) can work on code and collaborate, but have no admin access.  
- Ops (`ops1`) have elevated privileges: sudo access and access to sensitive data.  
- Manager (`manager1`) has limited read-only access.  
- A shared group (`shared-group`) includes devs, ops, and manager for collaboration folders.  

---

## Directory Structure

/company/
├── projects # developers’ work area
├── dev-shared # shared collaboration between developers
├── secure # sensitive data, ops only
├── shared # accessible to all roles
└── tmp # standard Linux temporary files



Permissions applied:  
- `projects` → read/write for developers, no access for others  
- `dev-shared` → setgid enabled so new files inherit the group  
- `secure` → only accessible by the ops group  
- `shared` → sticky bit applied so everyone can write but cannot delete others’ files  
- `tmp` → configured with sticky bit as a standard temporary folder  

---

## Automation with `user_setup.sh`

I wrote a script to automate the setup and make it reproducible:  
- create users and groups based on roles  
- assign users to the correct groups  
- set ownership and permissions for folders  
- apply setgid and sticky bit where needed  
- remove unnecessary users and groups  

This allows the full environment to be recreated in minutes in a secure and structured way.

---

## Testing and Validation

I verified the setup by simulating real usage:  
- Developers can work on `/projects` and `/dev-shared` without accessing `/secure`  
- Ops can manage the system and access secure folders  
- Manager has read-only access to necessary folders  
- All permissions match the defined roles  

