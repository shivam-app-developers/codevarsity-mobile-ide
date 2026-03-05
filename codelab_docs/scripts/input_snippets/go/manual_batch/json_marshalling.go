package main

import (
	"encoding/json"
	"fmt"
)

type User struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}

func main() {
	user := User{ID: 1, Name: "Alice"}
	jsonData, _ := json.Marshal(user)
	fmt.Println(string(jsonData))
}
