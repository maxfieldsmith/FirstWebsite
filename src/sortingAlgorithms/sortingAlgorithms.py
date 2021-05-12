# Insertion Sort - Time Complexity: o(n^2)
def insertionSort(nums):
    for i in range(1, len(nums)):
        min = nums[i]
        j = i - 1
        while j >= 0 and nums[j] > min:
            nums[j + 1] = nums[j]
            j -= 1
        
        nums[j + 1] = min


# Selection Sort - Time Complexity: O(n^2)
def selectionSort(nums):
    n = len(nums)
    for i in range(n):
        min_idx = i
        for j in range(i + 1, n):
            if (nums[min_idx] > nums[j]):
                min_idx = j

        nums[i], nums[min_idx] = nums[min_idx], nums[i]


# Bubble Sort - Time Complexity: O(n^2)
def bubbleSort(nums):
    n = len(nums)
    for i in range(n):
        for j in range(0, n - i - 1):
            if (nums[j] > nums[j + 1]):
                nums[j], nums[j + 1] = nums[j + 1], nums[j]


# Bubble Sort Optimized - Time Complexity: O(n^2)
# Optimized because if nothing is swapped in the inner loop we can stop
def optimizedBubble(nums):
    n = len(nums)
    for i in range(n):
        swap = False
        for j in range(0, n - i - 1):
            if (nums[j] > nums[j + 1]):
                nums[j], nums[j + 1] = nums[j + 1], nums[j]
                swap = True

        if swap == False:
            break


# Heapsort - Time Complexity: O(nlog(n))
# Need to build a binary tree from input array
# Heapify will be called recursively on each subtree to arrange correctly
def max_heapify(nums, n, i):
    largest = i
    l = 2 * i + 1
    r = 2 * i + 2
    if (l < n and nums[l] > nums[largest]):
        largest = l
    if (r < n and nums[r] > nums[largest]):
        largest = r
    if largest != i:
        nums[i], nums[largest] = nums[largest], nums[i]
        max_heapify(nums, n, largest)


def heapsort(nums):
    n = len(nums)
    for i in range(n // 2, -1, -1):
        max_heapify(nums, n, i)

    for i in range(n - 1, 0, -1):
        nums[i], nums[0] = nums[0], nums[i]
        max_heapify(nums, i , 0)


# Quicksort - Time Complexity: O(nlog(n))
# Need to partition array (so we can sort in place)
def partition(nums, p, r):
    x = nums[r]
    i = p - 1
    for j in range(p, r):
        if nums[j] < x:
            i = i + 1
            nums[i], nums[j] = nums[j], nums[i]

    nums[i + 1], nums[r] = nums[r], nums[i + 1]
    return i + 1


def quicksort(nums, p, r):
    if p < r:
        q = partition(nums, p, r)
        quicksort(nums, p, q - 1)
        quicksort(nums, q + 1, r)


# Merge Sort - Time Complexity: O(nlog(n))
def merge_sort(nums):
    if len(nums) > 1:
        mid = len(nums) // 2
        l = nums[:mid]
        r = nums[mid:]
        merge_sort(l)
        merge_sort(r)
        i = j = k = 0
        while (i < len(l) and j < len(r)):
            if l[i] < r[j]:
                nums[k] = l[i]
                i = i + 1
            else:
                nums[k] = r[j]
                j = j + 1
            k = k + 1

        while i < len(l):
            nums[k] = l[i]
            i = i + 1
            k = k + 1

        while j < len(r):
            nums[k] = r[j]
            j = j + 1
            k = k + 1


# Radix Sort - Time Complexity: O(nk)
def counting_sort(nums, k):
    n = len(nums)
    c = [0] * (10)
    b = [0] * (n)
    
    for i in range(n):
        idx = (nums[i] / k)
        c[int(idx % 10)] += 1

    for i in range(1, 10):
        c[i] += c[i - 1]

    for i in range(n - 1, -1, -1):
        idx = (nums[i] / k)
        b[c[int(idx % 10)] - 1] = nums[i]
        c[int(idx % 10)] -= 1

    print(f'{b}')

    for i in range(n):
        nums[i] = b[i]


def radix_sort(nums):
    max_num = max(nums)
    exp = 1
    while max_num // exp > 0:
        counting_sort(nums, exp)
        exp = exp * 10


nums = [160, 140, 220, 120, 141, 11, 211, 132, 112, 22, 242, 192, 153, 143, 223, 73, 133, 203, 173, 203, 14, 144, 164, 124, 204, 44, 144, 155, 135, 65, 225, 116, 226, 136, 247, 137, 237, 17, 237, 197, 187, 117, 128, 68, 68, 138, 79, 99, 49, 19]
radix_sort(nums)
# quicksort(nums, 0, len(nums) - 1)
print(f'Sorted Array: {nums}')