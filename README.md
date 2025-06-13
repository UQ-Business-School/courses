# UQ Business School – Course-Specific Projects

Welcome to the `courses` GitHub Pages repository for UQ Business School.

This repository is **strictly for course-specific projects**. It provides a central, organised space to store and publish interactive or web-based learning materials that relate directly to individual courses.

## 🔧 Structure & Guidelines

### Root Directory Policy
Only **folders** should exist in the root directory. Each folder must:
- Be named using the **official 8-character course code**, e.g. `mgts7610`
- Use only **lowercase** for the letters
- Contain only content related to that specific course

> ✅ **Good:** `mgts7610/index.html`  
> ❌ **Bad:** `interactive_tool.html` in root (not tied to a specific course)

### When to Create a New Repository
If a project is:
- Shared across **multiple courses**, or
- Designed for **general or reusable tools or frameworks**

…it should be created as a **separate repository**.

Examples:
- ✅ `uq-business-school.github.io/ibis`     (multi-course tool)
- ✅ `uq-business-school.github.io/jacson`   (multi-course use)
- ❌ `uq-business-school.github.io/courses/shared-tool` (incorrect use)

## 📁 Example Folder Structure

```
/mgts7610/
  ├── index.html
  ├── style.css
  └── /assets/

/tims7811/
  ├── module1.html
  └── script.js
```

## 🌐 Accessing Pages

Once deployed, course-specific tools can be accessed at:

```
https://uq-business-school.github.io/courses/coursecode/
```

For example:
- `MGTS7610`: [https://uq-business-school.github.io/courses/mgts7610/](https://uq-business-school.github.io/courses/mgts7610/)

---

For questions or contributions, please contact the Learning Design Team.
