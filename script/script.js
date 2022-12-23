let notepad = () => {

	let diaplayNotes = document.querySelector("#diaplay_notes");
	let addNote = document.querySelector("#addNote");
	let discard_note = document.querySelector("#discard_note");
	let add_note = document.querySelector("#add_note");
	let addTitle = document.querySelector("#addTitle");


	let updateNoteUI = () => {

		let data = JSON.parse(localStorage.getItem("notepad"));

		if (data && data.length > 0) {

			let displayNotesInnerHTML = "";

			let filtered_data = data.filter((e) => {
				console.log(Object.values(e).length > 0, Object.values(e)[0] !== "")

				return Object.values(e)[0] !== ""
			})

			filtered_data.forEach(element => {
				displayNotesInnerHTML += `
					<div class="note_card">

						<h3 class="note_headding">${element.note_title}</h3>

						<p class="notes">
							${element.note_body}
						</p>

						<div class="card_options">
							<p class="edit_card">EDIT</p>
							<p class="delete_card">DELETE</p>
						</div>

					</div>
				`
			});

			displayNotesInnerHTML += `
			<div class="adjust" id="adjust">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
					<path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/>
				</svg>
			</div>
		`

			diaplayNotes.innerHTML = displayNotesInnerHTML;

		} else {

			diaplayNotes.innerHTML = `
		
				<div class="adjust" id="adjust">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
						<path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/>
					</svg>
				</div>
				
			`
		}
	}

	updateNoteUI()


	let adjust = document.querySelector("#adjust");
	let delete_card = document.querySelectorAll(".delete_card");
	let arrDelCard = Array.from(delete_card)
	console.log(delete_card);


	adjust.addEventListener("click", () => {
		addNote.style.top = "50%"
	})



	add_note.addEventListener("click", () => {

		let data = JSON.parse(localStorage.getItem("notepad"));

		let new_note_title = addTitle.value;
		let new_edit_text_body = noteBody.value

		if (new_note_title != "" && new_edit_text_body != "") {

			if (data) {

				data.push({
					note_title: new_note_title,
					note_body: new_edit_text_body
				})

				let filtered_data = data.filter((e) => {
					return Object.values(e)[0] !== ""
				})

				let note_string_format = JSON.stringify(filtered_data);
				localStorage.setItem("notepad", note_string_format)

			} else {

				let note = [{
					note_title: new_note_title,
					note_body: new_edit_text_body
				}]

				let filtered_data = note.filter((e) => {
					return Object.values(e)[0] !== ""
				})


				let note_string_format = JSON.stringify(filtered_data)
				localStorage.setItem("notepad", note_string_format)
				
			}

			addNote.style.top = "-50%"

		}
		addTitle.value = "";
		noteBody.value = "";
		notepad()

	})


	discard_note.addEventListener("click", () => {
		addNote.style.top = "-50%"
	})


	arrDelCard.forEach(element => {
		element.addEventListener("click", (e) => {

			let data = JSON.parse(localStorage.getItem("notepad"));
			data.splice(arrDelCard.indexOf(element), 1);

			let filtered_data = data.filter((e) => {
				return Object.values(e)[0] !== ""
			})

			let note_string_format = JSON.stringify(filtered_data);

			localStorage.setItem("notepad", note_string_format);
			notepad()
		})
	});


	// EDIT THE NOTE

}


notepad()