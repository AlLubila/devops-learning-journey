# Permissions Automation Project

## Context
This project simulates a multi-user Linux environment with a broken setup.  
The goal is to practice Linux permissions, group/user management, and project organization — while thinking like a real DevOps engineer.  

I deliberately created misconfigurations (incorrect permissions, missing access, sensitive files in wrong places) to simulate real-life incidents.

---

## Problem Simulation
- Some developers could not modify files in `/project/app`
- Sensitive files were accessible to everyone
- Scripts were not executable
- Shared folders were not properly accessible

The goal was to **recover the environment**, set proper permissions, and make it secure but usable.

---

##  Solution
1. Groups created: `developers`, `devops`
2. Users created: `dev1`, `dev2`, `ops1`, `manager`
3. Users assigned to the proper groups
4. Project directories created:
    ```
    /project/
    ├── app/
    │   └── shared/
    ├── config/
    ├── logs/
    └── scripts/
    ```
5. Files created in each folder (simulating code, configs, logs, and scripts)
6. Permissions applied file-by-file:
   - Developers can modify code and shared folder
   - Ops team has access to config, logs, scripts
   - Sensitive files (like `secrets.env`) fully protected
7. Soft link created for `dev1` to access logs easily

