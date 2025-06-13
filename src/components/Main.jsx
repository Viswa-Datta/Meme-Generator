import React from 'react';

export default function Main() {

    const [memeImage, setMemeImage] = React.useState({
        topText:"Cheppa ra Cheppu",
        bottomText:"Naa Family Safe",
        imageUrl:"https://cdn.shopify.com/s/files/1/0896/6753/5157/files/mirchi-1-d9f62d664d48c90f9946aa90ba50b80e.jpg"});

    const [allMeme, setAllMeme] = React.useState([]);

    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMeme(data.data.memes))
    }, []);

    function getRandomMeme() {
        setMemeImage(prevMeme => {
            return{
                topText:"",
                bottomText:"",
                imageUrl: allMeme[Math.floor(Math.random() * allMeme.length)].url

            }
        })
    }

    function handleChangeText(event) {
        const {name, value} = event.target;
        setMemeImage(prevMeme=>{    
            return {
                ...prevMeme,
                [name]: value
            }
        })
    }

    return (
        <main>
            <div className="form">
                <label>Top Text
                    <input
                        type="text"
                        placeholder="Cheppa ra Cheppu"
                        name="topText"
                        onChange={handleChangeText}
                        value={memeImage.topText}
                    />
                </label>

                <label>Bottom Text
                    <input
                        type="text"
                        placeholder="Naa Family Safe"
                        name="bottomText"
                        onChange={handleChangeText}
                        value={memeImage.bottomText}
                    />
                </label>
                <button onClick={getRandomMeme}>Get a new meme image 🖼</button>
            </div>
            <div className="meme">
                <img src= {memeImage.imageUrl} />
                <span className="top">{memeImage.topText}</span>
                <span className="bottom">{memeImage.bottomText}</span>
            </div>
        </main>
    );
}