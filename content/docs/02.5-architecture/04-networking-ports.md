---
title: "Network Ports"
metaTitle: "Network Communication and Ports Management Platform on Prem"
metaDescription: "Port-Direction-Purpose Management Platform and Workload Clusters"
icon: ""
hideToC: false
fullWidth: false
---
 
import Tabs from 'shared/components/ui/Tabs';
import WarningBox from 'shared/components/WarningBox';
import InfoBox from 'shared/components/InfoBox';
import PointsOfInterest from 'shared/components/common/PointOfInterest';


# SaaS Network Communications and Ports

The following ports must be reachable from a network perspective for Palette SaaS to function correctly.

![SaaS Network Diagram with ports](/architecture_networking-ports_saas-network-diagram.png "title=SaaS Network Diagram with ports")

<br />

#### SaaS Managed


![SaaS network diagram displaying the network paths for edge](/architecture_networking-ports_saas-network-diagram-edge.png)


The following ports must be reachable from a network perspective for Palette to operate properly.

## Management Platform

|Port            |Direction|Purpose                   |    
|:---------------|:---------|:-----------------------|
|HTTPS (tcp/443) |INBOUND        |Browser/API access to management platform|
|NATS (tcp/4222) |INBOUND        |Agent running inside connecting to management platform|


## Workload Cluster


|Port            |Direction | Purpose|
|:---------------|:---------|:--------------|
|HTTPS (tcp/443) |OUTBOUND | API access to management platform|
|NATS (tcp/4222) |OUTBOUND       |Registry (packs, integrations), Pack containers, Application Updates|
|NATS (tcp/4222) |OUTBOUND       |Registry (packs, integrations), Pack containers, Application Updates|

<InfoBox>

You can expose inbound port 22 for SSH if you would like to access your cluster nodes for troubleshooting remotely. This is entirely optional and not required for Palette to operate appropriately.

</InfoBox>


# Self-Hosted Network Communications and Ports

The following ports must be reachable from a network perspective for Palette Sefl-Hosted to function correctly.


![On-prem network diagram](/architecture_networking-ports_network-diagram.png "#title="network diagram")

## Management Platform

|Port            |Direction|Purpose                   |    
|:---------------|:---------|:-----------------------|
|HTTPS (tcp/443) |INBOUND        |Browser/API access to management platform|
|NATS (tcp/4222) |INBOUND        |Message Bus for workload clusters|
|HTTPS (tcp/443) |OUTBOUND       |vSphere vCenter API,  Registry (packs, integrations), Pack containers, app updates.|
|HTTPS (tcp/6443)|OUTBOUND       |Workload K8s cluster API Server|


## Workload Cluster


|Port |Direction | Purpose|
|:---------------|:---------|:--------------|
|HTTPS (tcp/443) |OUTBOUND | API access to management platform|
|NATS (tcp/4222) |OUTBOUND       |Agent communication via message bus |
|HTTPS (tcp/443) |OUTBOUND       |vSphere vCenter API, Registry (packs, integrations), Pack containers, Application updates.

<InfoBox>

You can expose inbound port 22 for SSH if you would like to access your cluster nodes for troubleshooting remotely. This is entirely optional and not required for Palette to operate appropriately.

</InfoBox>