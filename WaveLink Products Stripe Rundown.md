# Stripe Product Catalog

## Service Plans Overview

Three main plan categories:
- **WaveGuardians**: Backup internet solutions
- **WaveRiders**: Seasonal internet packages
- **WaveMakers**: Primary internet service

## Step 1: Products to be Created in Stripe

| Product ID | Product Name | Description |
|------------|--------------|-------------|
| waveguardians_basic | WaveGuardians Backup Internet | Backup internet solution with 15GB premium network access |
| waveguardians_max | WaveGuardians Backup Internet Max | Enhanced backup internet with 25GB premium network access |
| waveriders_50 | WaveRiders Essentials Seasonal Internet 50 | Seasonal internet with 50GB premium network access |
| waveriders_100 | WaveRiders Max Essentials Seasonal Internet 100 | Enhanced seasonal internet with 100GB premium network access |
| wavemakers | WaveMakers Primary Internet | Unlimited premium network access with no throttling |
| mifi_x_pro | MiFi X PRO Device | Multi-carrier 5G Wi-Fi hotspot device purchase |
| mifi_x_pro_rental | MiFi X PRO Device Rental | Monthly rental of MiFi X PRO device |
| fx3100 | Inseego FX3100 Device | Fixed wireless access device purchase |
| fx3100_rental | Inseego FX3100 Device Rental | Monthly rental of FX3100 device |

## Price IDs for Each Product

For each product, we'll create the following pricing options:

### WaveGuardians Backup Internet
```
Product: waveguardians_basic
Price ID: waveguardians_basic_monthly
Amount: $35.95
Recurring: Monthly
Additional fixed amount: $2.99 (Regulation Fee)

Price ID: waveguardians_basic_annual
Amount: $408 ($35.95 × 12 with 15% discount)
Recurring: Yearly
```

### WaveGuardians Backup Internet Max
```
Product: waveguardians_max
Price ID: waveguardians_max_monthly
Amount: $55.95
Recurring: Monthly
Additional fixed amount: $2.99 (Regulation Fee)

Price ID: waveguardians_max_annual
Amount: $612 ($55.95 × 12 with 15% discount)
Recurring: Yearly
```

### WaveRiders Essentials Seasonal Internet 50
```
Product: waveriders_50
Price ID: waveriders_50_monthly
Amount: $69.95
Recurring: Monthly
Additional fixed amount: $2.99 (Regulation Fee)

Price ID: waveriders_50_annual
Amount: $732 ($69.95 × 12 with 15% discount)
Recurring: Yearly
```

### WaveRiders Max Essentials Seasonal Internet 100
```
Product: waveriders_100
Price ID: waveriders_100_monthly
Amount: $89.95
Recurring: Monthly
Additional fixed amount: $2.99 (Regulation Fee)

Price ID: waveriders_100_annual
Amount: $936 ($89.95 × 12 with 15% discount)
Recurring: Yearly
```

### WaveMakers Primary Internet
```
Product: wavemakers
Price ID: wavemakers_monthly
Amount: $109.95
Recurring: Monthly
Additional fixed amount: $2.99 (Regulation Fee)

Price ID: wavemakers_annual
Amount: $1,140 ($109.95 × 12 with 15% discount)
Recurring: Yearly
```

### Hardware Options

```
Product: mifi_x_pro
Price ID: mifi_x_pro_purchase
Amount: $399.00
Type: One-time

Product: mifi_x_pro_rental
Price ID: mifi_x_pro_rental_monthly
Amount: $9.95
Recurring: Monthly

Product: fx3100
Price ID: fx3100_purchase
Amount: $499.00
Type: One-time

Product: fx3100_rental
Price ID: fx3100_rental_monthly
Amount: $12.95
Recurring: Monthly
```

## Product Metadata

### Service Plans Metadata
```
category: [WaveGuardians, WaveRiders, or WaveMakers]
data_allowance: [15GB, 25GB, 50GB, 100GB, or Unlimited]
qos_priority: [true or false]
typical_download_speed: "87-318 Mbps (5G)"
typical_upload_speed: "14-56 Mbps (5G)"
typical_latency: "18-36 ms"
max_devices: [32 or 64, depending on hardware]
```

### Hardware Metadata
```
device_type: [mobile_hotspot or fixed_wireless]
connectivity: [up to 32 devices or up to 64 devices]
battery_backup: [yes or no]
wifi_standard: "Wi-Fi 6 (802.11ax)"
network_compatibility: "5G Sub-6, LTE Cat 22 fallback"
sim_support: "Multi-Carrier SIM"
```

## Activation Fee Product

```
Product ID: activation_fee
Product Name: Activation Fee
Description: One-time setup fee for new service

Price ID: activation_fee_standard
Amount: $79.95
Type: One-time
```

## Notes

- **Security Deposit**: 
	- We'll add a $150 pre-authorized security deposit for hardware.
- **Waived Activation Fee**: 
	- For annual plans, the checkout flow will waive the activation fee.
- **Dynamic Pricing**: 
	- We'll use these price IDs as a base and **implement ip-based pricing adjustments on the backend.**
