package main

import "fmt"

func main() {
	m := make(map[string]int)
	m["Apple"] = 5
	m["Banana"] = 10
	m["Orange"] = 8

	fmt.Println("Inventory:")
	for key, value := range m {
		fmt.Printf("%s: %d\n", key, value)
	}
}
