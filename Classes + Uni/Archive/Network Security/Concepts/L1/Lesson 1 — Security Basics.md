# Main

[Security Basics](https://brightspace.nyu.edu/d2l/le/lessons/444512/units/11279242)

# Lecture

### CIA

CIA - You will see this in many textbooks 
- **Confidentiality** - keeping information secret from unauthorized users 
- **Integrity** - insuring that the information is genuine and hasn’t been tampered with
- **Availability** - ensuring that the system is always available
+
- **Authenticity** – determining the origin of data – Type of Integrity
- **Non-Repudiation** – proving the integrity and origin – Type of Integrity

### Risk Analysis and Management

A **risk** consists of something of value (an “asset” at risk) which may lose value if a negative event occurs. (in a battlefield communications system, human lives are at risk if the system cannot be used to call in support. The related IT asset is the availability of the system, and the impact of a failure is potential for loss of life)

A **threat** to a system is any potential occurrence, malicious or otherwise, that can have an adverse effect on the assets and resources associated with the system. 

A **vulnerability** of a system is some characteristic that makes it possible for a threat to occur. 

An **attack** (exploit) on a system is some action that involves exploitation of some vulnerability in order to cause an existing threat to occur

### Risk Assessment 

Measures the impact of an event, and the probability of an event (threat agent exploiting a vulnerability)

- **Remove the risk (risk avoidance)** - Remove the system component or feature associated with the risk if the feature is not worth the risk. 
- **Mitigate the risk** - Reduce the risk with countermeasures. 
- **Transfer the risk** – Transfer to somebody else via insurance, warnings etc. 
- **Accept the risk** – Risk is low but costly to mitigate - worth accepting. Monitor.

#### Example 
- Risk **avoidance**: Don’t drive or just not driving on snowy days 
- Risk **mitigation**: Seat belts, air bags, “crumple zones” in auto design, following DWI laws, defensive driving techniques, ABS, driving slow 
- Risk **transfer**: insurance
- Risk **acceptance**: residual risk of injury, deductible on insurance
### Risk Management Calculation

Asset Value - Given
Single Loss Expectancy (**SLE**: Asset Value x Exposure Factor)
Annualized Rate of Occurrence (**ARO**: chance every year that there will be breach)
Annualized Loss Expectancy (**ALE**: SLE $\times$ ARO)

#### Example
Value of the building - $750,000
SLE could be $250,000
ARO could be 5%
ALE = 50,000 x .05 = $12,500

### Qualitative Approach
1. Establish Impact: Low, medium, high. (Under 10k, between 10k-1m, over 1m) or type of loss (SSN breach)
2. Establish Likelihood: Low, medium, high likelihood

![[z/z ScreenShots/Screenshot 2025-03-20 at 8.16.52 PM.jpg| 500]]

## CIA 

# Readings
## ![[Chapter 1 Network Security Basics, 1.2-1.6]]
## ![[Chapter 6 Attacks on TCP Protocol]]
