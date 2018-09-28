"use strict";

const app = new Vue({
	el:"#app",
	data:
	{
		editMember:null,
		newMember:null,
		family:[],
	},
	methods:
	{
		createMember(name)
		{
			fetch('http://rest.learncode.academy/api/unique-user/family', {
	   		method: "POST",
	     	headers:{
	        	"Content-Type": "application/json",
	      	},
	     	body: JSON.stringify({name: name}),
	    	})
	    	.then(response => response.json())
	    	.then((response) =>{
	      	console.log("You saved this item", response)})
    		.then((response)=>{
    			//this.family.push(data);
    			this.family = response;
    		})
    		.then(()=>{
    			this.newMember = null;
    		})
		},
		deleteMember(id)
		{
			fetch("http://rest.learncode.academy/api/unique-user/family/" + id, {method: "DELETE"})
			.then(()=>{
				console.log("Member DELETED\n");
			})
		},
		updateMember(member)
		{
			fetch("http://rest.learncode.academy/api/unique-user/family/" + member.id,
			{
				body: JSON.stringify(member),
				method: "PUT",
				headers:
				{
					"Content-Type":"application/json",
				},
			})
			.then(()=>{
				this.editMember = null;
			})
		},
	},
	mounted()
	{
		console.log("==== MOUNTED ====");
		fetch("http://rest.learncode.academy/api/unique-user/family")
		.then(response => response.json())
		.then((data)=>{
			this.family.push(data);
		})
	},
	template:
	`<div>
		<h2>My family members:</h2>
		<li v-for="member in family">
			<div v-if="editMember === member.id">
				<input v-on:keyup.13="updateMember(member)" v-model="member.name"/>	
				<button v-on:click="updateMember(member)">Save</button>
			</div>
			<div v-else-if="newMember == 1">
				<label for="member.name">Name</label>
				<input v-on:keyup.13="createMember(member.name)" v-model="member.name"/>	
				<button v-on:click="createMember(member.name)">Create</button>
			</div>

			{{member}}
		</li>
		<div>
			<button v-on:click="editMember = member.id">Edit</button>
			<button v-on:click="deleteMember(member.id)">X</button>
			<button v-on:click="newMember = 1">Create</button>
		</div>
	</div>`,
});