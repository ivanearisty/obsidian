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
### Preliminary Info

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

Upon further analysis of these files, a mistake becomes clear in how we configured our coverage analysis.

When checking out head locally we get the following when running `pytest . --cov=src --cov-report=term-missing`: 

```
src/inbox_client_impl/src/inbox_client_impl/__init__.py               5      0   100%
src/inbox_client_impl/src/inbox_client_impl/_impl.py                 63      9    86%   60-65, 109, 171-178
src/inbox_client_protocol/src/inbox_client_protocol/__init__.py       3      0   100%
src/message/src/message/__init__.py                                   1      0   100%
src/message_impl/src/message_impl/__init__.py                         5      0   100%
src/message_impl/src/message_impl/_impl.py                           80     24    70%   31-39, 90, 93-95, 102-124, 134
```

If we instead run `pytest . -m "not integration" --cov=src --cov-report=term-missing`:
```
Name                                                              Stmts   Miss  Cover   Missing
-----------------------------------------------------------------------------------------------
src/inbox_client_impl/src/inbox_client_impl/__init__.py               5      0   100%
src/inbox_client_impl/src/inbox_client_impl/_impl.py                 63     25    60%   60-65, 109, 138-140, 146-164, 171-178, 185-196
src/inbox_client_protocol/src/inbox_client_protocol/__init__.py       3      0   100%
src/message/src/message/__init__.py                                   1      0   100%
src/message_impl/src/message_impl/__init__.py                         5      0   100%
src/message_impl/src/message_impl/_impl.py                           80     24    70%   31-39, 90, 93-95, 102-124, 134
-----------------------------------------------------------------------------------------------
TOTAL                                                               157     49    69%
```

You can see that the first command ends up with a much higher coverage of the inbox_client_impl component, specifically:
- CircleCI: 68%
- No Integration: 60%
- All Tests: 86%

> This error indicates a mistake with how we organized our CircleCI workflow.

### Opinion

As mentioned previously, we split tests by unit and integration; however, we only ran coverage on unit tests. More specifically, some tests from integration (and potentially e2e) are raising our coverage locally, but then multiple tests do not get executed in CircleCI leading to lower coverage levels.

This indicates a fork in the road for "what philosophy do we want to take":
- A) We can mend together the two tests as a single "test" job on CircleCI, and have coverage run after all tests (unit, integration, and e2e) run.
- B) We can accept that we must test every part of the component within unit tests.

I believe that approach B is a better idea. *Components should be responsible for their own coverage*. It should not be the case that some parts of the component are only tested when integrating with another component. 

> The idea of relying on a higher level of abstraction to pass our coverage tests seems and, likely is, incorrect.

### Coverage changes upstream

After pulling in the component from the external team, CircleCI (expectedly) does not pass. Hence, the relevant changes come after our fixes dedicated specifically to coverage in the final PR for HW4 (SHA )
