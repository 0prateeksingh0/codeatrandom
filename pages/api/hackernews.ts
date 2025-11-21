import type { NextApiRequest, NextApiResponse } from 'next';
import { HackerNewsStory } from '@/types';

// Fetches top 5 stories from HackerNews
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<HackerNewsStory[] | { error: string }>
) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed. Use GET.' });
  }

  try {
    const topStoriesResponse = await fetch(
      'https://hacker-news.firebaseio.com/v0/topstories.json'
    );

    if (!topStoriesResponse.ok) {
      throw new Error('Failed to fetch top stories from HackerNews');
    }

    const topStoryIds: number[] = await topStoriesResponse.json();
    const storyIdsToFetch = topStoryIds.slice(0, 5);
    const storyPromises = storyIdsToFetch.map(async (id) => {
      try {
        const storyResponse = await fetch(
          `https://hacker-news.firebaseio.com/v0/item/${id}.json`
        );

        if (!storyResponse.ok) {
          console.error(`Failed to fetch story ${id}`);
          return null;
        }

        const story = await storyResponse.json();

        const formattedStory: HackerNewsStory = {
          id: story.id,
          title: story.title || 'No title',
          url: story.url || `https://news.ycombinator.com/item?id=${story.id}`,
          score: story.score || 0,
          time: story.time || 0,
          type: story.type || 'story',
          by: story.by || 'unknown',
        };

        return formattedStory;
      } catch (error) {
        console.error(`Error fetching story ${id}:`, error);
        return null;
      }
    });

    const stories = await Promise.all(storyPromises);

    const validStories = stories.filter(
      (story): story is HackerNewsStory => story !== null
    );

    if (validStories.length === 0) {
      return res.status(500).json({ error: 'Failed to fetch any stories' });
    }

    return res.status(200).json(validStories);
  } catch (error) {
    console.error('Error in HackerNews API:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch HackerNews stories. Please try again later.' 
    });
  }
}

