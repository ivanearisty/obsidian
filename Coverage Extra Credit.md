# iae225
## Prompt

**Code coverage relevant to a PR.**  
- Compute code coverage before the PR (on the merge base)
- Compute code coverage after the PR (on the revision PR currently is on)  

For any modified line:
- say what the coverage was before and after the PR.  
- say if coverage overall has improved or worsened.  

WDYT?
## Answer

I am going to analyze branch [hw-4-v2](https://github.com/khamseaffan/Inbox-Client/commits/hw4-v2/).

This branch is directly off of the final pr for [hw3](https://github.com/khamseaffan/Inbox-Client/commit/4277bfd2c872eb85f84c68ff953cbd7311c4671f)

We added two types of integration tests in CircleCI. Unit tests are on the "*unit test*" job and integration and e2e both belong to the "*integration*" job.

Our CircleCI coverage is purely based on *unit tests*. It's odd because, in a way, it makes sense that all of the code of a component should be "covered" with the tests that that same component defines. This philosophy makes sense since the assertion "every component is responsible for testing all parts of itself" intuitively (at least to me) seems correct.
### HW 4 Coverage when pulling external repos

For our merge base we have (SHA 4277bfd2c872eb85f84c68ff953cbd7311c4671f), we can see that coverage is somewhat low:

```
Name                                                              Stmts   Miss  Cover
-------------------------------------------------------------------------------------
src/inbox_client_impl/src/inbox_client_impl/__init__.py               5      0   100%
src/inbox_client_impl/src/inbox_client_impl/_impl.py                 63     20    68%
src/inbox_client_protocol/src/inbox_client_protocol/__init__.py       3      0   100%
src/message/src/message/__init__.py                                   1      0   100%
src/message_impl/src/message_impl/__init__.py                         5      0   100%
src/message_impl/src/message_impl/_impl.py                           80     24    70%
-------------------------------------------------------------------------------------
TOTAL                                                               157     44    72%
```

The files of interest are:
`src/inbox_client_impl/src/inbox_client_impl/_impl.py` with only 68% coverage
and 
`src/message_impl/src/message_impl/_impl.py` with 70% coverage

Upon further analysis of these files, there are X code segments which did not have tests 


### HW 4 Coverage of existing