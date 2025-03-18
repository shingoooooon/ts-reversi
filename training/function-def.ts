import fs from 'fs'

const main = () => {
    let filecontent = 'not loaded'

    fs.readFile('package.json', (err, data) => {
        filecontent = data.toString()
        console.log(filecontent)
    })

    console.log(filecontent)
}

main()