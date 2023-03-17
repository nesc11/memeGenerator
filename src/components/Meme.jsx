import React from "react"

export default function Meme() {

    const [allMemes, setAllMemes] = React.useState([])

    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        imageUrl: ""
    })

    const getRandomMeme = (memesArray) => {
        const randomNumber = Math.floor(Math.random() * memesArray.length)
        const randomMeme = memesArray[randomNumber]
        setMeme(prevMeme => {
            return {
                ...prevMeme,
                imageUrl: randomMeme.url
            }
        })
    }

    const handleClick = () => {
        getRandomMeme(allMemes)
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        setMeme(prevMeme => {
            return {
                ...prevMeme,
                [name]: value
            }
        })
    }

    console.log("rendered")
    React.useEffect(() => {
        console.log("ran")
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => {
                setAllMemes(data.data.memes)
                getRandomMeme(data.data.memes)
            })
    }, [])

    return (
        <main className="main">
            <div className="form">
                <input
                    className="input"
                    type="text"
                    onChange={handleChange}
                    value={meme.topText}
                    name="topText"
                    placeholder="Top text"
                />
                <input
                    className="input"
                    type="text"
                    onChange={handleChange}
                    value={meme.bottomText}
                    name="bottomText"
                    placeholder="Bottom text"
                />
                <button className="get-image-btn" onClick={handleClick}>Get a new meme image</button>
            </div>
            <div className="meme">
                {allMemes.length > 0 && <img className="meme-image" src={meme.imageUrl} />}
                <h2 className="meme-text top">{meme.topText}</h2>
                <h2 className="meme-text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    )
}