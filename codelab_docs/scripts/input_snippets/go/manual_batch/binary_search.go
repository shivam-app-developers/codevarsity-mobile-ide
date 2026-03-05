package main

import "fmt"

func binarySearch(arr []int, target int) int {
	low, high := 0, len(arr)-1
	for low <= high {
		mid := (low + high) / 2
		if arr[mid] == target {
			return mid
		} else if arr[mid] < target {
			low = mid + 1
		} else {
			high = mid - 1
		}
	}
	return -1
}

func main() {
	nums := []int{10, 20, 30, 40, 50}
	target := 30
	fmt.Printf("Index of %d: %d\n", target, binarySearch(nums, target))
}
