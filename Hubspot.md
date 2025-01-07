### Cleaning Hubspot

Before removing duplicate emails 979 records in Hubspot:

![[Screenshot 2025-01-06 at 1.59.10 PM.jpg]]

After removing duplicate emails we get 947

![[Screenshot 2025-01-06 at 1.59.37 PM.jpg]]

```python
# Getting all rows from webflow that are not in hubspot
new_rows = wf[~wf['Email'].isin(hub['Email'])]
```
![[Screenshot 2025-01-06 at 2.01.56 PM.jpg]]

### Adding missing rows from WF

25 rows total

Some emails might not be valid, must check for those. For example "daria" is not a valid email:

![[Screenshot 2025-01-06 at 2.03.40 PM.jpg]]

```python
import re

# Define a function to check if an email is valid
def is_valid_email(email):
    if pd.isna(email):
        return False
    email_regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(email_regex, email) is not None

# Apply the function to filter out rows with invalid emails
newrows_matched = newrows_matched[newrows_matched['Email'].apply(is_valid_email)]
```

result gives us 15 unmatched rows from webflow that were not in our original hubspot

![[Screenshot 2025-01-06 at 2.04.53 PM.jpg]]![[Screenshot 2025-01-06 at 2.05.07 PM.jpg]]

Adding to the hubspot gives 962 total rows:

![[Screenshot 2025-01-06 at 2.06.08 PM.jpg]]

### Recleaning hubspot

We might not need every column, so we are only keeping a subset:

```python
updated_df = updated_df.drop(columns=['Conversion Date', 'Conversion Page', 'Conversion Title', 'Contact first name', 'Contact last name', 'Contact email', 'Contact ID'])
```

![[Screenshot 2025-01-06 at 2.07.46 PM.jpg]]

Removing more inconsistencies like quotes around cities and @ in IG handle.
Some dates are completely wrong so applying best guess to normalize.

![[Screenshot 2025-01-06 at 2.22.29 PM.jpg]]

## IG Handles

### Getting every possible IG handle from Webflow

We try to get every handle by realizing that if handle is blank the data should be in name:

```python
blank = []

for index, row in fuzzy.iterrows():
    if pd.isna(row['IG Handle']) or row['IG Handle'] == '':
        blank.append(row['Name'])
    else:
        blank.append(row['IG Handle'])

print(blank)
print(len(blank))
```

![[Screenshot 2025-01-06 at 2.36.57 PM.jpg]]

Same number of rows as above, no data loss

Clean this output:

![[Screenshot 2025-01-06 at 2.37.46 PM.jpg]]

### Best guess

```python
import pandas as pd
from rapidfuzz import fuzz

def find_mismatched_handles(blank_list, df, threshold):

    # Extract the unique handles from dataframe (and remove any NaNs)
    df_handles = df["IG Handle"].dropna().unique().tolist()

    not_in_df = []
    for handle in blank_list:
        # Compute the best (maximum) ratio for 'handle' against all known df_handles
        best_ratio = max(
            fuzz.ratio(handle, h) for h in df_handles
        ) if df_handles else 0  # handle empty df_handles gracefully
        
        # If it's below the threshold, we consider it "not in the dataframe"
        if best_ratio < threshold:
            not_in_df.append(handle)

    return not_in_df


df = pd.read_csv('final.csv')
print(df.shape)
threshold = 90
mismatched = find_mismatched_handles(blank, df, threshold=threshold)
print("Handles not in dataframe (below similarity threshold):", mismatched)
print(len(mismatched))
```

Use this one: 

(962, 13)
Handles not in dataframe (below similarity threshold of 90): ['d.g.006', 'Amira Hassan', 'alejandra_fernandezmora', '', 'thanthar____', 'evelynmira99', 'samascosta', 'wedalmatar', '063maggie', 'kisokisoo', 'noemicworld', 'Deleted', 'test', 'nikahit', 'alinamariesophiew', 'arthurcrovetto', 'siegkrysthal', 'Hannah Kim', 'Liamfitandfun', 'Gems.haney', 'gabkropfl', 'ashleygallowayyy', 'yaseminnymanme.com', 'mara.gindorf', 'Seanpfc', 'mae.krn', 'luci.didonna', 'Ksksksk', 'Johnathan.Puls', 'hannahaltgassen', 'thtamphm', 'francoismartin__', 'Juliampaz_', 'zoefroxilia', 'martinclrmnt', 'Zalmeeb', 'andreadivalentina', 'cantthinkofausername000', 'danigroman', 'melissa.garay', 'Alicia_torriani', 'Ferr']
42

(962, 13) Handles not in dataframe (below similarity threshold of 95): ['regsstar_', 'ggunnell', 'elinaktm', '_zzohaa_', 'abbieg.__', 'lilli12o1', '_.bex__', 'alinxbr', '0ce1an', 'ananyya_x', 'margotlds', 'saieemole', 'alinajmnz', 'ponitaty', 'ebaide.a', 'smitsvs', 'aliceadjr', 'farahq24', '75250frc', 'ferrenyw', 'elineckat', '_esidore', 'tntbkl', 'evaberk', 'i.g.m.h', 'prxshita_', 'linsfikri', 'd.g.006', 'rositadhvr', 'aann.elle', 'susannaxh', 'vrqnika', 'itsekans', 'hanaabel_', 'imaanes', 'nehrayaa', 'tara.va', 'hafsah.v', 'hira.nvh', 'roxyotero', 'xxloree', 'Amira Hassan', 'alejandra_fernandezmora', 'resu14700', 'laii.ia', '_luxylu', 'anatujo', 'cloe_stph', 'c.rsnne', 'mikdlvs', 'ypkva', 'lu.vdr', 'xufana', 'junetroan', 'alisandry', 'muyion', 'cindywxng', 'clem.hlg', 'maaaanina', 'alexuslg', '', 'saskiahkn', '_drialvez', 'annesowsr', 'begumoznl', 'yravasio', 'ygp0emi3', 'rae.h.kim', 'c.rsnne', 'samaabada', 'lmmdlw_', 'thanthar____', 'marchetoo', 'menaaraim', 'Larisuh', 'mariapbv', 'tanaraflm', 'mialuh_', 'e__mclean', 'dreasf_', 'tn.aiya', 'evelynmira99', 'michi.zee', 'karla_b27', 'rigzum', 'samascosta', 'ttaniamb', 'megangoh', 'izzydut', 'snanyarko', 'carestonn', 'eltsks', 'firasdmk', 'sav.mello', 'wedalmatar', 'gdrouant', 'darcywt', 'pro.ffs', 'nourysul', 'fatma.lft', 'efrenaye', '063maggie', 'kisokisoo', 'mimz2005', 'mayarodic', 'kyleem4yy', 'gaiacrc', 'i_am_gabs', 'toniiwi', 'valiiib', 'brenaef', 'noemicworld', 'Deleted', 'annaorwin', 'emlsncl', '1vnaas', 'marie_lsc', 'lifeby.ck', 'na.d1ne', 'alinakwie', 'jaz_rihal', 'camila_ht', 'rhen_anne', 'boyanabh', 'catmgonz', 'moiragen', 'ritaoulds', 'panizjay', 'wildele', 'leaelil', 'idamcl', 'elvie_may', 'emmat', 'kyra.mvw', 'Hy0xae', 'chlfr__', 'nico.2108', 'dejjys', 'kyleem4yy', 'test', 'emilie_v5', 'coupdcut', 'mvdw.44', 'hadooni_', 'Doris6522', 'thngoc.94', 'yeennhidg', 'shotr.an', 'rubydefa', 'timobenzz', 'amauryynf', 'voyushdv', 'alaiin', 'delphsr', 'max_jrnt', 'stevem_17', 'nikahit', 'alinamariesophiew', 'hugopkahn', 'arthurcrovetto', 'siegkrysthal', 'Hannah Kim', 'Liamfitandfun', 'Gems.haney', 'gabkropfl', 'ashleygallowayyy', 'yaseminnymanme.com', 'a.adwn', 'j4azminnn', 'mara.gindorf', 'noahzri', 'Seanpfc', 'aley.kd', 'mae.krn', 'luci.didonna', 'Aoibhin.gre', 'Ksksksk', 'Johnathan.Puls', 'lclaudiaa', 'daphnedlg', 'patrickbr', 'omarbarg', 'hannahaltgassen', 'thtamphm', 'francoismartin__', 'Juliampaz_', 'zoefroxilia', 'martinclrmnt', 'noa_ibghi', 'enzofunke', 'Zalmeeb', 'diysly', 'coccadid', 'andreadivalentina', 'cantthinkofausername000', 'lvb812', 'danigroman', 'katvalee', 'melissa.garay', 'edobrof', 'Alicia_torriani', 'Ferr'] 202