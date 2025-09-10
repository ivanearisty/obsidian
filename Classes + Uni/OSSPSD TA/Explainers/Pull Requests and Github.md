---
theme: consult
height: 600
margin: 0.1
maxScale: 4
css: Templates/slides.css
---
# Pull Requests and Github

A practical guide to the workflow and best practices for submitting your assignments using GitHub.

---
## Super Small Git Refresher 

---
### Git

- Distributed version control system
- Allows multiple devs to work on the same code

![[Pasted image 20250910132216.png | 600]]

---

### Merging
`git merge` allows you to integrate changes from different branches into a single branch. When you merge one branch into another, Git creates a new "merge commit" that combines the histories of both branches. This merge commit has two parent commits, preserving the individual development timelines.

There are two main types of merges:
- **Fast-Forward Merge**
- **Three-Way Merge:** When the branches have diverged, Git finds a common ancestor commit and creates a new merge commit that combines the changes from both branches since that common ancestor.
![[Pasted image 20250910134520.png]]


---

### Rebasing

---

For more info check out [this](https://blog.stackademic.com/git-rebase-explained-like-youre-new-to-git-263c19fa86ec) article by [Subodh Shetty](https://medium.com/@subodh.shetty87?source=post_page---byline--263c19fa86ec---------------------------------------)  and [this](https://www.reddit.com/r/git/comments/1mg1mfp/i_finally_ditched_git_merge_for_rebase_and/) post by [No-Firefighter-6753](https://www.reddit.com/user/No-Firefighter-6753/) on reddit.

---
## Super Small Git Refresher - PRs

- PRs are the official way to submit homework
- Enable focused feedback and code review
- Create a clean, auditable history of your work

---

## Super Small Git Refresher