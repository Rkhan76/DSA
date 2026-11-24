/*
=====================================================================
  24 Nov — Slow & Fast Pointers (Two Pointer Technique)
=====================================================================

IDEA
  Do pointers use karte hain, jo alag-alag speed se chalte hain.

  Type 1: Same direction, array ke andar (slow = write position,
          fast = read position)
          -> in-place changes, duplicates hatana, etc.

  Type 2: Floyd's Cycle Detection (Tortoise & Hare)
          -> slow 1 step chalta hai, fast 2 step chalta hai
          -> agar cycle hai to dono kabhi na kabhi mil jaate hain
          -> cycle ka start dhundne ke liye: mil jaane ke baad ek
             pointer ko start par reset karo, phir dono 1-1 step
             chalao, jaha milenge wahi cycle ka start hai.

TODAY'S PROBLEMS
  1. Remove Duplicates from Sorted Array   (Type 1)
  2. Find the Duplicate Number             (Type 2)
  3. Happy Number                          (Type 2)
=====================================================================
*/


/* ---------------------------------------------------------------
   1. Remove Duplicates from Sorted Array
   ---------------------------------------------------------------
   Sorted array se duplicates in-place hatao, aur unique elements
   ki count return karo.

   slow -> last unique element ki position
   fast -> naya element dhundta hua aage badhta hai

   Jab nums[fast] != nums[slow], matlab naya unique mila:
   slow++ karke wahan nums[fast] likh do.

   Example : [1, 1, 2, 2, 3, 4, 4]  ->  4   (array: [1, 2, 3, 4, ...])
   Time    : O(n)
   Space   : O(1)
--------------------------------------------------------------- */
function removeDuplicates(nums) {
    let slow = 0

    for (let fast = 1; fast < nums.length; fast++) {
        if (nums[fast] !== nums[slow]) {
            slow++
            nums[slow] = nums[fast]
        }
    }

    return slow + 1
}


/* ---------------------------------------------------------------
   2. Find the Duplicate Number  (Floyd's Cycle Detection)
   ---------------------------------------------------------------
   Array me n+1 numbers hain, values 1..n ke beech. Sirf ek number
   repeat hota hai. Array ko modify kiye bina wo number dhundo.

   Trick: index -> nums[index] ko "next pointer" maan lo, to ye
   linked list ban jati hai. Duplicate number wahi hai jaha cycle
   shuru hoti hai (kyunki do alag index same value par point karte hain).

   Phase 1: slow 1 step, fast 2 step -> cycle ke andar kahin milte hain
   Phase 2: slow ko start par reset karo, dono 1-1 step chalao
            -> jaha milenge wahi duplicate hai

   Example : [2, 5, 9, 6, 9, 3, 8, 9, 7, 1]  ->  9
   Time    : O(n)
   Space   : O(1)
--------------------------------------------------------------- */
function findDuplicateNumber(nums) {
    let slow = nums[0]
    let fast = nums[0]

    // Phase 1: cycle ke andar meeting point dhundo
    do {
        slow = nums[slow]
        fast = nums[nums[fast]]
    } while (slow !== fast)

    // Phase 2: cycle ka start (= duplicate) dhundo
    slow = nums[0]
    while (slow !== fast) {
        slow = nums[slow]
        fast = nums[fast]
    }

    return slow
}


/* ---------------------------------------------------------------
   3. Happy Number
   ---------------------------------------------------------------
   Number ke digits ke squares ka sum nikalte raho. Agar kabhi 1
   mil gaya to happy number hai, agar cycle me phas gaye to nahi.

   Example : 19 -> 1² + 9² = 82 -> 8² + 2² = 68 -> 6² + 8² = 100 -> 1
             => happy (true)
             2 -> 4 -> 16 -> 37 -> 58 -> 89 -> 145 -> 42 -> 20 -> 4 ...
             => cycle, happy nahi (false)

   Yaha "next" step = digits ke squares ka sum.
   Cycle detection wahi slow/fast se: slow 1 baar, fast 2 baar.
   Agar slow aur fast 1 ke alawa kisi value par mil gaye -> cycle.

   Time  : O(log n)
   Space : O(1)
--------------------------------------------------------------- */

// Helper: digits ke squares ka sum   (19 -> 1*1 + 9*9 = 82)
function sumOfSquareOfDigits(num) {
    let sum = 0

    while (num > 0) {
        let digit = num % 10
        sum += digit * digit
        num = Math.floor(num / 10)   // integer division (num / 10 se decimal aata)
    }

    return sum
}

function isHappyNumber(num) {
    let slow = num
    let fast = num

    while (fast !== 1) {
        slow = sumOfSquareOfDigits(slow)
        fast = sumOfSquareOfDigits(sumOfSquareOfDigits(fast))

        if (slow === fast && fast !== 1) return false   // 1 ke bina cycle mili
    }

    return true
}


/* ---------------------------------------------------------------
   TESTS
--------------------------------------------------------------- */
console.log(removeDuplicates([1, 1, 2, 2, 3, 4, 4]))               // 4
console.log(findDuplicateNumber([2, 5, 9, 6, 9, 3, 8, 9, 7, 1]))   // 9
console.log(sumOfSquareOfDigits(19))                                // 82
console.log(isHappyNumber(19))                                      // true
console.log(isHappyNumber(2))                                       // false
