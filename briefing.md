# Strategic Opportunity Briefing — Florida 5G Wireless

        Prepared: 2025-08-16 00:48 UTC

        ## Executive Summary
        Florida shows concentrated opportunities in mid-sized places where terrestrial 100/20 coverage is partial and fiber presence is limited. Our analysis highlights specific places with high underserved shares and counties with strong monopoly indicators, signaling near-term wins for 5G fixed wireless.

        ## Top Target Zones (Places)
        The following places exhibit high opportunity scores (combining underserved 100/20, lack of fiber/cable, and scale):

| place_name          | place_name_full         | total_units | underserved_100_20 | no_fiber_score | no_cable_score | place_opportunity_score |
| ------------------- | ----------------------- | ----------- | ------------------ | -------------- | -------------- | ----------------------- |
| On Top of the World | On Top of the World, FL | 12715       | 0.225              | 0.834          | 0.405          | 0.443                   |
| Coral Springs       | Coral Springs, FL       | 55571       | 0.214              | 0.562          | 0.83           | 0.442                   |
| Ocala               | Ocala, FL               | 36810       | 0.196              | 0.801          | 0.252          | 0.389                   |
| Gainesville         | Gainesville, FL         | 86583       | 0.187              | 0.658          | 0.266          | 0.344                   |
| Cocoa               | Cocoa, FL               | 11371       | 0.113              | 0.814          | 0.205          | 0.342                   |
| Marion Oaks         | Marion Oaks, FL         | 9605        | 0.07               | 0.983          | 0.078          | 0.332                   |
| West Pensacola      | West Pensacola, FL      | 11297       | 0.1                | 0.842          | 0.121          | 0.327                   |
| Brent               | Brent, FL               | 9761        | 0.137              | 0.702          | 0.21           | 0.314                   |
| Iona                | Iona, FL                | 13485       | 0.053              | 0.834          | 0.126          | 0.302                   |
| Ferry Pass          | Ferry Pass, FL          | 15885       | 0.108              | 0.721          | 0.152          | 0.301                   |

        ## Monopoly Pressure (Counties)
        Counties with elevated monopoly scores (high max provider share, low competition):

| county_name | county_name_full | provider_count | max_provider_share | hhi | monopoly_score | fips |
| --- | --- | --- | --- | --- | --- | --- |
| Broward, FL | Broward, FL | 19 | 1.0 | 4.226 | 1.0 | 12011 |
| Gadsden, FL | Gadsden, FL | 15 | 1.0 | 3.272 | 1.0 | 12039 |
| Hillsborough, FL | Hillsborough, FL | 26 | 1.0 | 5.898 | 1.0 | 12057 |
| Indian River, FL | Indian River, FL | 9 | 1.0 | 4.811 | 1.0 | 12061 |
| Liberty, FL | Liberty, FL | 9 | 1.0 | 3.818 | 1.0 | 12077 |
| Miami-Dade, FL | Miami-Dade, FL | 23 | 1.0 | 4.288 | 1.0 | 12086 |
| Okeechobee, FL | Okeechobee, FL | 8 | 1.0 | 4.53 | 1.0 | 12093 |
| Osceola, FL | Osceola, FL | 18 | 1.0 | 4.659 | 1.0 | 12097 |
| Palm Beach, FL | Palm Beach, FL | 17 | 1.0 | 4.247 | 1.0 | 12099 |
| Pinellas, FL | Pinellas, FL | 16 | 1.0 | 5.783 | 1.0 | 12103 |

        ## Why These Zones
        - Underserved 100/20 indicates performance gaps ripe for 5G fixed wireless.
        - Low fiber presence reduces incumbent defensibility.
        - Monopoly pressure suggests pricing power and customer dissatisfaction in need of alternatives.

        ## Visual Evidence
        - Top places bar: /Users/suape/WorkDir/analysis/outputs/top_places_opportunity.png
        - Scatter units vs underserved: /Users/suape/WorkDir/analysis/outputs/scatter_units_vs_underserved.png
        - Place correlations heatmap: /Users/suape/WorkDir/analysis/outputs/heatmap_place_correlations.png
        - County monopoly choropleth: /Users/suape/WorkDir/analysis/outputs/florida_county_monopoly.png

        ## Next Steps
        - Enrich with demographics: 55+ communities, multi-family, and mobile home parks to focus commercial outreach.
        - Add price proxies (income, rent, CPI) to refine price-performance targeting.
        - Deploy targeted address acquisition and geocoding for hyper-local campaigns.
        - Stand up BigQuery dataset mirroring these tables for ongoing quarterly refresh and BI dashboards.