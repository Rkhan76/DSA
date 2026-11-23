let isPalindrome = function(head) {
    
    let slow = head
    let fast = head

    while(fast != null && fast.next != null){
        slow = slow.next
        fast = fast.next.next
    }

    // now we have to detech the linkedlist from middle and reverse it

    let prev = null
    let curr = slow

    while(curr){
        let next = curr.next
        curr.next = prev
        prev = curr
        curr = next
    }
    
    let left = head
    let right = prev

    while(right){
        if(left.val !== right.val) return false
        left = left.next
        right = right.next
    }

    return true
};