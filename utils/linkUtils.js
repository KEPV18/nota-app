export const getFavicon = (url) => {
  try {
    const urlObj = new URL(url);
    return `https://www.google.com/s2/favicons?domain=${urlObj.hostname}`;
  } catch (error) {
    return 'https://www.google.com/s2/favicons?domain=google.com';
  }
};

export const getLinkPreview = async (url) => {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname;

    // Detect platform
    let platform = 'website';
    if (hostname.includes('youtube.com')) platform = 'youtube';
    else if (hostname.includes('twitter.com') || hostname.includes('x.com')) platform = 'twitter';
    else if (hostname.includes('facebook.com')) platform = 'facebook';
    else if (hostname.includes('instagram.com')) platform = 'instagram';
    else if (hostname.includes('linkedin.com')) platform = 'linkedin';

    // Fetch metadata
    const response = await fetch(url);
    const html = await response.text();

    // Extract title
    const titleMatch = html.match(/<title>(.*?)<\/title>/i);
    const title = titleMatch ? titleMatch[1] : urlObj.hostname;

    // Extract description
    const descriptionMatch = html.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"[^>]*>/i);
    const description = descriptionMatch ? descriptionMatch[1] : '';

    return {
      title,
      description,
      favicon: getFavicon(url),
      platform,
    };
  } catch (error) {
    console.error('Error getting link preview:', error);
    return {
      title: url,
      description: '',
      favicon: getFavicon(url),
      platform: 'website',
    };
  }
};

export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};

export const formatUrl = (url) => {
  try {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return `https://${url}`;
    }
    return url;
  } catch (error) {
    return url;
  }
}; 