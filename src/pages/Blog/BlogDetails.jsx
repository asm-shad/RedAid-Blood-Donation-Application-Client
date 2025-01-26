import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Container from "../../components/Container/Container";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Button from "../../components/Button/Button";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import Heading from "../../components/Heading/Heading";
import { FaQuoteLeft } from "react-icons/fa";

const BlogDetails = () => {
  const { id } = useParams(); // Get blog ID from URL
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Blog data query
  const { data: blog = {}, isLoading } = useQuery({
    queryKey: ["blog", id],
    queryFn: async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/blogs/${id}`
        );
        return data;
      } catch (err) {
        setError("Failed to fetch blog data");
        console.error(err);
        return {}; // Return empty object in case of error
      }
    },
  });

  // Quote data query
  const { data: quoteData = {}, isLoading: isLoadingQuote } = useQuery({
    queryKey: ["quote"],
    queryFn: async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/quote`);
      return data;
    },
  });

  // Safely extract quote and author with fallback values
  const {
    quote = "Giving is not just about making a donation.",
    author = "Unknown",
  } = quoteData;

  if (error) {
    return (
      <Container>
        <Helmet>
          <title>Error</title>
        </Helmet>
        <div className="text-center py-8">
          <h2 className="text-2xl font-bold text-red-600">{error}</h2>
          <p className="text-gray-600">
            The blog you are looking for does not exist.
          </p>
        </div>
      </Container>
    );
  }

  if (isLoading) {
    return (
      <Container>
        <Helmet>
          <title>Loading...</title>
        </Helmet>
        <div className="text-center py-8">
          <LoadingSpinner />
        </div>
      </Container>
    );
  }

  // Destructure blog data safely
  const { title, category, thumbnail, author: blogAuthor = {}, content } = blog;
  const { name = "Unknown Author", image = "" } = blogAuthor;

  return (
    <Container>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div className="min-h-screen">
        <div className="flex flex-col lg:flex-row justify-between w-full gap-12 py-8 items-stretch">
          {/* Left Section: Image */}
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full h-full overflow-hidden rounded-xl shadow-lg">
              <img
                className="object-cover w-full h-[300px] md:h-[500px] lg:h-full rounded-xl"
                src={thumbnail}
                alt="Blog header"
              />
            </div>
          </div>

          {/* Right Section: Content */}
          <div className="flex-1 flex flex-col bg-white p-8 rounded-xl shadow-lg">
            <Heading title={title} subtitle={`Category: ${category}`} />
            <hr className="my-6" />
            <div className="text-lg font-light text-neutral-600 leading-relaxed">
              {content}
            </div>
            <hr className="my-6" />

            {/* Author Information */}
            <div className="text-xl font-semibold flex flex-row items-center gap-4">
              <span>Author: {name}</span>
              {image && (
                <img
                  className="rounded-full"
                  height="40"
                  width="40"
                  alt="Author Avatar"
                  referrerPolicy="no-referrer"
                  src={image}
                />
              )}
            </div>
            <hr className="my-6" />

            {/* Read More Button */}
            <Button
              label="Read More Blogs"
              onClick={() => navigate("/blog")}
              className="mt-auto"
            />
          </div>
        </div>

        {/* Quote Section */}
        <div className="flex-1 flex items-center justify-center bg-red-50 p-6 rounded-lg shadow-md">
          <div className="text-center text-red-600 max-w-md">
            <FaQuoteLeft size={40} className="mx-auto mb-4" />
            <p className="text-xl italic">{quote}</p>
            <p className="text-right font-semibold mt-2">- {author}</p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default BlogDetails;
