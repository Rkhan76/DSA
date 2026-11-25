

function maxSubarraySum(arr) {
    let best = arr[0]
    let ans = arr[0]

    for(let i=1;i<arr.length;i++){
        best = Math.max(arr[i]+best, arr[i])
        ans = Math.max(ans, best)
    }

    return ans
}

function minSubarraysum(arr){
    let best = arr[0]
    let ans = arr[0]

    for(let i =1;i<arr.length;i++){
        best = Math.min(arr[i]+best, arr[i])
        ans = Math.min(ans, best)
    }

    return ans
}

function maxSubarrayporduct(arr){
    let minbest = arr[0]
    let maxbest = arr[0]
    let ans = arr[0]

    for(let i=1;i<arr.length;i++){
        let v1 = arr[i]
        let v2 = arr[i] * minbest
        let v3 = arr[i] * maxbest

        minbest = Math.min(v1,Math.min(v2,v3))
        maxbest = Math.max(v1, Math.max(v2,v3))
        ans = Math.max(ans, Math.max(minbest, maxbest))
    }

    return ans
}

console.log(maxSubarrayporduct([-2,3,-4]))