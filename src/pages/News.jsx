import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Container, Grid } from "@mui/material";

const News = () => {
  const apiKey = `61e825a52af90c082bc6eaa31d81b0c3`;
  const url = `https://gnews.io/api/v4/top-headlines?category=general&lang=en&country=us&apikey=${apiKey}`;
  const [news, setNews] = useState([]);

  const getNews = async () => {
    const req = await axios.get(url);
    setNews(req.data.articles);
  };

  useEffect(() => {
    getNews();
  }, []);

  return (
    <div>
      <Container>
        <Grid container gap={3}>
          {news.map((item) => (
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={item.image}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default News;
