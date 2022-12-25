let notepad = () => {

	let CREATE_NOTE = "create_note"
	let noteTitle = document.querySelector("#noteTitle");
	let noteBody = document.querySelector("#noteBody");
	let add_note_btn = document.querySelector("#add_note_btn");
	let discard_note_btn = document.querySelector("#discard_note_btn");


	let popup = false;

	const open_popup_window = () => {
		addNote.style.top = "50%"
		popup = true
	}

	const close_popup_window = () => {
		noteTitle.value = "";
		noteBody.value = "";
		addNote.style.top = "-50%"
		popup = false
	}

	const getFilteredData = (notes) => {
		let data = notes;
		if (data) {
			let holdingData = data.filter((e) => {
				return Object.values(e)[0] !== "";
			})
			return holdingData;
		} else {
			data = [];
			return data
		}
	}


	// UPDATE UI

	let filtered_data = getFilteredData(JSON.parse(localStorage.getItem("notepad")));

	let displayNotesInnerHTML = "";

	if (filtered_data && filtered_data.length > 0) {

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
	}

	else {
		displayNotesInnerHTML = `
			<div class="adjust" id="adjust">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
					<path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/>
				</svg>
			</div>
		`
	}

	document.querySelector("#diaplay_notes").innerHTML = displayNotesInnerHTML;

	let addNote = document.querySelector("#addNote");
	let adjust = document.querySelector("#adjust");
	let delete_card = document.querySelectorAll(".delete_card");
	let edit_card = document.querySelectorAll(".edit_card")
	let arrDelCard = Array.from(delete_card)
	let editCard = Array.from(edit_card)

	let uploadData = (filtered_data) => {
		console.log("hi")
		let note_string_format = JSON.stringify(getFilteredData(filtered_data));
		localStorage.setItem("notepad", note_string_format)
	}

	adjust.addEventListener("click", (e) => {
		e.stopPropagation()

		let filtered_data = getFilteredData(JSON.parse(localStorage.getItem("notepad")));

		open_popup_window();

		// WHEN CLICK ON ADD BUTTON
		add_note_btn.addEventListener("click", (e) => {

			e.stopPropagation()
			e.stopImmediatePropagation()

			let new_note_title = noteTitle.value;
			let new_edit_text_body = noteBody.value

			if (new_note_title != "" && new_edit_text_body != "") {
				filtered_data.push({
					note_title: new_note_title,
					note_body: new_edit_text_body
				})
			}

			uploadData(filtered_data)

			close_popup_window()

			notepad()
		})

		// IF CLICK ON DISCARD BUTTON
		discard_note_btn.addEventListener("click", close_popup_window)
	})



	// delete card button
	arrDelCard.forEach(element => {

		element.addEventListener("click", (e) => {

			let filtered_data = getFilteredData(JSON.parse(localStorage.getItem("notepad")));

			filtered_data.splice(arrDelCard.indexOf(element), 1);

			uploadData(filtered_data);

			notepad()

		})

	});




	// EDIT THE NOTE

	editCard.forEach(element => {

		element.addEventListener("click", () => {

			let filtered_data = getFilteredData(JSON.parse(localStorage.getItem("notepad")))

			let targetElementIndex = editCard.indexOf(element)

			let prevTitle = filtered_data[targetElementIndex].note_title
			let prevBody = filtered_data[targetElementIndex].note_body

			noteTitle.value = prevTitle;
			noteBody.value = prevBody;

			add_note_btn.innerText = "EDIT"

			open_popup_window()

			add_note_btn.addEventListener("click", (e) => {

				e.stopImmediatePropagation()
				e.stopPropagation()

				let new_note_title = noteTitle.value;
				let new_edit_text_body = noteBody.value

				let emptyField = new_note_title == "" && new_edit_text_body == "";
				let sameEntry = new_note_title == prevTitle || new_edit_text_body == prevBody

				if (emptyField) {
					console.log("Fields Empty");
				}

				else if (sameEntry) {
					console.log("same entry");
				}

				else if (!emptyField && !sameEntry) {
					console.log("TRUE BOTH CONDITION");
					let editedData = {
						note_title: new_note_title,
						note_body: new_edit_text_body,
					}

					filtered_data.splice(targetElementIndex, 1, editedData);
					let filtered_edited_data = getFilteredData(filtered_data);
					uploadData(filtered_edited_data);
					notepad();
					close_popup_window()
				};
			});


			discard_note_btn.addEventListener("click", close_popup_window);
		});
	});
};


notepad()