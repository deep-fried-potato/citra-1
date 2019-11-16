def sortDistance(val):
    return val[1]

def closestLocations(totalCrates, allLocations, truckCapacity):
    dist = []
    ans = []
    for i in range(len(allLocations)):
        temp = []
        temp.append(i)
        temp.append(allLocations[i][0]**2+allLocations[i][1]**2)
        dist.append(temp)
        
    dist.sort(key=sortDistance)
    for i in range(truckCapacity):
        ans.append(allLocations[dist[i][0]])
    print(ans)
    return ans