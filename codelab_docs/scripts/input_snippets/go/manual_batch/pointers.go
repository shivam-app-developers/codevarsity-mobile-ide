package main

import "fmt"

func updateValue(n *int) {
	*n = *n + 10
}

func main() {
	x := 5
	fmt.Println("Before:", x)
	updateValue(&x)
	fmt.Println("After:", x)
}
