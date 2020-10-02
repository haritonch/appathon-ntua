package com.example.restservice;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ArtObjectController {

	@GetMapping("/mainObject")
	public ArtObject artobject() {
		return new ArtObject();
	}
}
