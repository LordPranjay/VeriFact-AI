"use client";

import { useState, useEffect, ChangeEvent, use } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  ThumbsUp,
  MessageSquare,
  Share,
  AlertTriangle,
  Flag,
  CheckCircle,
  Link,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/utils/supbase/client";
import { toast } from "sonner";


interface NewsItem {
  id: number;
  user_id: string | null;
  created_at: string;
  isFake: string;
  fake_percentage: number;
  real_percentage: string;
  reasons_for_determination: string;
  related_links: string[];
  author_verified: string;
  post_date: string;
  subject_expertise: string;
  media_presence: string;
  cross_check_sources: string[];
  upvotes: number;
  votes: string[];
  title?: string;
  url?: string;
  image?: string;
}

export default function PostDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [post, setPost] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const supabase = createClient();

  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      console.log(user);

      if (user) {
        const { data: userData } = await supabase
          .from("users")
          .select("*")
          .eq("id", user.id)
          .single();
        console.log("we are inside the posts dection");
        console.log(userData);
        setCurrentUser(userData);
      }
    };
    fetchUser();
  }, []);

  // Fetch the post data from Supabase
  useEffect(() => {
    console.log("Post ID:", id);
    if (!id) return;

    const fetchPostFromSupabase = async () => {
      try {
        // Fetch the news item from Supabase
        const { data, error } = await supabase
          .from("news")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          throw error;
        }

        if (data) {
          console.log("Fetched data:", data);
          // Process the data and set default values if needed
          const postData: NewsItem = {
            ...data,
            // Parse JSON strings if they come as strings from the database
            related_links:
              typeof data.related_links === "string"
                ? JSON.parse(data.related_links)
                : data.related_links || [],
            cross_check_sources:
              typeof data.cross_check_sources === "string"
                ? JSON.parse(data.cross_check_sources)
                : data.cross_check_sources || [],
            title: data.title || "News Verification Report", // Default title
            image: data.image || "/fact-check-default.jpg", // Default image
            url: data.url || null,
            votes: data.votes || [],
          };
          console.log("post data:", postData);
          setPost(postData);
          setUpvoteCount(postData.votes.length);
          // Set initial upvote state based on current user
          setIsUpvoted(
            currentUser ? postData.votes.includes(currentUser.id) : false
          );

          // Fetch comments if you have a comments table
        } else {
          // No data found
          setPost(null);
        }

        setLoading(false);
      } catch (error) {
        console.log("dvyhujhsgthghdzfgtyhfcftdgfg");
        console.error("Error fetching post:", error);
        setLoading(false);
      }
    };

    // Fetch posts from Supabase

    fetchPostFromSupabase();
  }, [id, currentUser]);


  const handleOpenSource = () => {
    if (post?.url != null) {
      window.open(post.url, "_blank");
    } else {
      toast.error("Source URL not found", {
        style: {
          backgroundColor: "#f44336",
          color: "white",
        },
      });
    }
  };

  const handleGoBack = () => {
    router.push('/');
  };

  // First, update the NewsItem interface to include votes array

  // Then modify the handleUpvote function:
  const handleUpvote = async () => {
    if (!currentUser) {
      router.push("/login");
      return;
    }

    try {
      const currentVotes = post?.votes || [];
      let newVotes;

      if (currentVotes.includes(currentUser.id)) {
        // Remove user's vote
        newVotes = currentVotes.filter((id) => id !== currentUser.id);
      } else {
        // Add user's vote
        newVotes = [...currentVotes, currentUser.id];
      }

      const { data, error } = await supabase
        .from("news")
        .update({ votes: newVotes })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;

      setPost((prevPost) => ({
        ...prevPost!,
        votes: newVotes,
      }));
      setUpvoteCount(newVotes.length);
      setIsUpvoted(newVotes.includes(currentUser.id));
    } catch (error) {
      console.error("Error updating votes:", error);
    }
  };

  const handleShare = async () => {
    const currentUrl = window.location.href;
    await navigator.clipboard.writeText(currentUrl);

    // Show a toast notification using sonner

    toast.success("Link copied to clipboard!", {
      style: {
        backgroundColor: "blue",
        color: "white",
      },
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto px-6 py-20">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Post not found</h2>
          <Button onClick={handleGoBack} className="mt-4">
            Back to posts
          </Button>
        </div>
      </div>
    );
  }

  // Determine if the post is verified/fake
  const isVerified = post.isFake === "false";
  const verificationPercentage = isVerified
    ? post.real_percentage
    : post.fake_percentage;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Back button */}
      <Button
        variant="ghost"
        className="mb-6 text-blue-600 hover:text-blue-800 hover:bg-blue-50 -ml-2"
        onClick={handleGoBack}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to all posts
      </Button>

      {/* Post header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <Badge
            className={`
              ${
                post.subject_expertise
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-700"
              } py-1 px-3 text-sm`}
          >
            {post.subject_expertise || "Uncategorized"}
          </Badge>

          <div
            className={`rounded-full px-3 py-1 text-xs font-medium text-white shadow-md ${
              isVerified ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {isVerified ? (
              <div className="flex items-center">
                <CheckCircle className="h-3 w-3 mr-1" />
                Verified ({verificationPercentage}%)
              </div>
            ) : (
              <div className="flex items-center">
                <AlertTriangle className="h-3 w-3 mr-1" />
                Misleading ({verificationPercentage}%)
              </div>
            )}
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-3">{post.title}</h1>

        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
          <div className="flex items-center">
            <span className="mr-4">{post.post_date}</span>
            <span>
              Author Verified: {post.author_verified === "true" ? "Yes" : "No"}
            </span>
          </div>

          <div className="flex space-x-3">
            <Button
              variant="ghost"
              size="sm"
              className="text-red-600 hover:bg-red-50"
            >
              <Flag className="h-4 w-4 mr-1" />
              Report
            </Button>
          </div>
        </div>
      </div>

      {/* Main image */}
      <div className="relative w-full h-80 mb-8 rounded-xl overflow-hidden">
        <div className="relative w-full h-full">
          <Image
            src={
              post.isFake === "true"
                ? "https://i.pinimg.com/736x/6c/c0/08/6cc0087776f947c54ab23d9526898cfb.jpg"
                : "https://i.pinimg.com/736x/8b/46/0a/8b460ad19de8a97577b341308c368870.jpg"
            }
            alt={post.title || "News verification"}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        <div
          className={`absolute bottom-4 left-4 ${
            isVerified ? "bg-green-600" : "bg-red-600"
          } text-white px-3 py-1 rounded-full text-sm font-medium flex items-center`}
        >
          {isVerified ? (
            <>
              <CheckCircle className="h-4 w-4 mr-1" />
              Verified Information
            </>
          ) : (
            <>
              <AlertTriangle className="h-4 w-4 mr-1" />
              Misinformation Alert
            </>
          )}
        </div>
      </div>

      {/* Post content */}
      <div className="prose prose-blue max-w-none mb-8">
        <h2 className="text-xl font-semibold mb-4">Verification Analysis</h2>
        <p>{post.reasons_for_determination}</p>
      </div>

      {/* Related links */}
      {post.related_links && post.related_links.length > 0 && (
        <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">
            Related Sources:
          </h3>
          <ul className="space-y-2">
            {post.related_links.map((link, index) => (
              <li key={index}>
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 hover:underline flex items-center"
                >
                  <Link className="h-4 w-4 mr-2" />
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Cross-check sources */}
      {post.cross_check_sources && post.cross_check_sources.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Cross-Check Sources:
          </h3>
          <ul className="space-y-2">
            {post.cross_check_sources.map((source, index) => (
              <li key={index}>
                <p
                  // href={source}
                  className="text-blue-600 hover:text-blue-800 hover:underline flex items-center"
                >
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                  {source}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Separator className="my-8" />

      {/* Interaction buttons */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex space-x-4">
          <Button
            variant={isUpvoted ? "default" : "outline"}
            className={
              isUpvoted
                ? "bg-blue-600 text-white cursor-pointer"
                : "text-blue-600 cursor-pointer"
            }
            onClick={handleUpvote}
          >
            <ThumbsUp className="h-4 w-4 mr-2" />
            Upvote {upvoteCount}
          </Button>

          <Button
            variant="outline"
            onClick={() => document.getElementById("comment-textarea")?.focus()}
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Comment {comments.length}
          </Button>

          {/* New Source button */}
          <Button
            variant="outline"
            className="text-green-600 cursor-pointer"
            onClick={handleOpenSource}
          >
            <Link className="h-4 w-4 mr-2" />
            Source
          </Button>
        </div>

        <div className="flex space-x-2">
          <Button
            variant="outline"
            className="text-gray-600 cursor-pointer"
            onClick={handleShare}
          >
            <Share className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </div>
    </div>
  );
}
