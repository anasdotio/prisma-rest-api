import type { Request, Response } from 'express';
import { prisma } from '../config/prisma.js';

export const getAllPosts = async (req : Request, res : Response) => {
	try {
		const posts = await prisma.post.findMany({
			where: { isPublished: true },
		});

		if (posts.length === 0) {
			return res.status(404).json({ message: "No posts found" });
		}

		return res.status(200).json({
			posts,
			totalPosts: posts.length,
			message: "Posts retrieved successfully"
		});

	} catch (error) {
		console.error("Error retrieving posts:", error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const getPostById = async (req : Request, res : Response) => {
	const { id } = req.params;

	try {
		const post = await prisma.post.findUnique({
			where: { id: Number(id) }
		});

		if (!post) {
			return res.status(404).json({ message: "Post not found" });
		}

		return res.status(200).json({
			post,
			message: "Post retrieved successfully"
		});

	} catch (error) {
		console.error("Error retrieving post by ID:", error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const createPost = async (req : Request, res : Response) => {
	const { title, content } = req.body;

	try {
		const newPost = await prisma.post.create({
			data: { title, content }
		});

		return res.status(201).json({
			post: newPost,
			message: "Post created successfully"
		});

	} catch (error) {
		console.error("Error creating post:", error);
		return res.status(500).json({ message: "Internal server error" });
	}

};