const express = require("express");
const {  generate } = require("./services");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("api is running!");
});

app.post("/", async (req, res) => {
  const { text, height, width } = req.body;


  // calculate the font size

  try {
    const options = {
      output: {
        directory: "",
        fileName: "thumbnail.png",
      },
      image: {
        width,
        height,
        backgroundColor: "#222639",
        // backgroundImage: require.resolve('./images/background.jpg'),
      },
      style: {
        title: {
          fontFamily: "Noto Sans CJK JP",
          fontColor: "#bb99ff",
          fontWeight: "bold",
          fontSize: 64,
          paddingTop: 100,
          paddingBottom: 200,
          paddingLeft: 150,
          paddingRight: 150,
        },
        text: {
          fontFamily: "Noto Sans CJK JP",
          fontColor: "#f0f5fa",
          fontWeight: "400",
          fontSize: 42,
        },
      },
      meta: {
        text,
      },
      fontFile: [
        {
          path: require.resolve("./fonts/NotoSansCJKjp-Bold.otf"),
          family: "Noto Sans CJK JP",
          weight: "bold",
        },
        {
          path: require.resolve("./fonts/NotoSansCJKjp-Regular.otf"),
          family: "Noto Sans CJK JP",
          weight: "400",
        },
      ],

      timeout: 10000,
    };

    const output = await generate(options);

    console.log(`INFO - Successfully generated: ${output}`);

    res.status(200).send(output);
  } catch (error) {
    console.error(`ERROR - ${error.message}`);
  }
});

app.listen(process.env.port || 4000, () => {
  console.log(`Server is running on port ${process.env.port || 4000}`);
});
