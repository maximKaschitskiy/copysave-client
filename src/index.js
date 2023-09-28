document.addEventListener("DOMContentLoaded", () => {
  const body = document.querySelector(".body")
  const main = document.querySelector(".main")

  body.addEventListener("dragover", event => {
    event.preventDefault()
    main.classList.add("dragover")
  })

  body.addEventListener("dragleave", event => {
    event.preventDefault()
    main.classList.remove("dragover")
  })

  body.addEventListener("drop", event => {
    event.preventDefault()
    main.classList.remove("dragover")
    getData(event.dataTransfer)
  })

  body.addEventListener("paste", event => {
    sendData(getData(event)).then(res => console.log(res))
  })

  const getData = (event) => {
    console.log(event.clipboardData)
    const files = event.clipboardData.files
    const textData = event.clipboardData.getData("text/plain")
    const formData = new FormData()
  
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i])
    }
  
    if (textData) {
      formData.append("text", textData)
    }

    return formData
  }

  const sendData = data => {
    return fetch(`http://localhost:3000/file`, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Credentials": "true",
      },
      body: data
    }).then((res) => {
      if (res.ok) {
        return res.json()
      }
        return Promise.reject(`Ошибка: ${res.status}`)
    })
  }

})
