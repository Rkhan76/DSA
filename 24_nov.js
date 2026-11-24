
// Slow and fast pointers question

function removeDuplicates(nums){
    let slow = 0

    for(let fast = 1;fast < nums.lenght;fast++){
        if(nums[fast]  !== nums[slow]){
            slow++
            nums[slow] = nums[fast]
        }
    }

    return slow + 1
}

function findduplicatenumber(nums){
    slow = nums[0]
    fast = nums[0]

    while(true){
        slow = nums[slow]
        fast = nums[nums[fast]]

        if(slow === fast) break
    }

    slow = nums[0]
    while(slow != fast){
        slow = nums[slow]
        fast = nums[fast]

    }

    return slow
}

console.log(removeDuplicates([1, 1, 2, 2, 3, 4, 4]))
console.log(findduplicatenumber([2, 5, 9, 6, 9, 3, 8, 9, 7, 1]))
