import React, { useState, useEffect } from 'react';
import { useLocation } from '@docusaurus/router';
import './UrduTranslateButton.css';

// English → Urdu dictionary for common terms
const commonTranslations = {
  'Home': 'ہوم',
  'Blog': 'بلاگ',
  'Documentation': 'دستاویزات',
  'Tutorial': 'سبق',
  'Introduction': 'تعارف',
  'Installation': 'تنصیب',
  'Configuration': 'تشکیل',
  'Login': 'لاگ ان',
  'Logout': 'لاگ آؤٹ',
  'Search': 'تلاش',
  'Next': 'اگلا',
  'Previous': 'پچھلا',
  'Read more': 'مزید پڑھیں',
  'Get started': 'شروع کریں',
  'Welcome to our website': 'ہماری ویب سائٹ پر خوش آمدید',
  'Physical AI Textbook': 'فزیکل اے آئی ٹیکسٹ بک',
  'Humanoid Robotics': 'ہیومنوائڈ روبوٹکس',
  'Simulation': 'سیمولیشن',
  'ROS2': 'آر او ایس 2',
  'Fundamentals': 'بنیادیں',
  'Advanced': 'اعلیٰ درجے کی',
  'Basics': 'بنیادیں',
  'Overview': 'جائزہ',
  'Chapter': 'باب',
  'Course': 'کورس',
};

// Cache for storing translations
const translationCache = new Map();

// Function to translate text using Google Translate API
const translateText = async (text, sourceLang = 'en', targetLang = 'ur') => {
  const cacheKey = `${sourceLang}-${targetLang}-${text.substring(0, 50)}`;

  // Check if translation is already cached
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey);
  }

  try {
    // Using Google Translate API free tier (unofficial endpoint)
    const response = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`);

    if (!response.ok) {
      throw new Error(`Translation API error: ${response.status}`);
    }

    const data = await response.json();

    // Extract translated text from response
    let translatedText = '';
    if (data && data[0]) {
      translatedText = data[0].map(item => item[0]).filter(text => text).join('');
    } else {
      // Fallback to original text if translation not found
      translatedText = text;
    }

    // Cache the translation
    translationCache.set(cacheKey, translatedText);

    return translatedText;
  } catch (error) {
    console.error('Translation error:', error);
    // Fallback: return the original text if translation fails
    return text;
  }
};

// Function to translate entire document content
const translateDocument = async (content) => {
  if (!content) return content;

  // If content is already in Urdu, return as is
  if (isUrdu(content)) {
    return content;
  }

  // Check cache first
  const cacheKey = `doc-${content.substring(0, 100)}`;
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey);
  }

  try {
    // Use Google Translate API for the entire content
    const translatedContent = await translateText(content);

    // Cache the full document translation
    translationCache.set(cacheKey, translatedContent);

    return translatedContent;
  } catch (error) {
    console.error('Document translation error:', error);
    return content; // Return original content if translation fails
  }
};

// Helper function to check if text is in Urdu
const isUrdu = (text) => {
  // Check if text contains Urdu characters (Unicode range 0600-06FF)
  const urduRegex = /[\u0600-\u06FF]/;
  return urduRegex.test(text);
};

// Function to translate all text nodes in an element
const translateElement = async (element) => {
  if (!element) return;

  const walker = document.createTreeWalker(
    element,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: (node) => {
        // Only accept text nodes that contain actual text (not just whitespace)
        return node.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    }
  );

  const textNodes = [];
  let node;

  while (node = walker.nextNode()) {
    textNodes.push(node);
  }

  // Process each text node
  for (const textNode of textNodes) {
    const originalText = textNode.nodeValue;

    // Skip if text is already in Urdu
    if (isUrdu(originalText)) continue;

    // Check if we have a common translation
    let foundCommonTranslation = false;
    for (const [english, urdu] of Object.entries(commonTranslations)) {
      if (originalText.includes(english)) {
        textNode.nodeValue = originalText.replace(new RegExp(english, 'gi'), urdu);
        foundCommonTranslation = true;
        break;
      }
    }

    // If no common translation found, use Google Translate API
    if (!foundCommonTranslation) {
      try {
        const translatedText = await translateText(originalText);
        if (translatedText !== originalText) {
          textNode.nodeValue = translatedText;
        }
      } catch (error) {
        console.error('Error translating text node:', error);
        // Keep original text if translation fails
      }
    }
  }
};

const UrduTranslateButton = () => {
  const [isUrdu, setIsUrdu] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  // Function to restore original content
  const restoreOriginalContent = () => {
    // In a real implementation, we would store original content and restore it
    // For now, we'll just reload the page to restore original content
    window.location.reload();
  };

  // Function to handle translation
  const translateCurrentPage = async () => {
    const mainContent = document.querySelector('[class*="container"], .main-wrapper, main, .markdown');
    if (mainContent) {
      await translateElement(mainContent);
    }
  };

  const toggleTranslation = async () => {
    setIsLoading(true);

    try {
      if (!isUrdu) {
        // Switch to Urdu
        setIsUrdu(true);

        // Translate current page content
        await translateCurrentPage();
      } else {
        // Switch back to English
        setIsUrdu(false);
        restoreOriginalContent();
      }
    } catch (error) {
      console.error('Translation toggle error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle route changes to ensure translation persists or resets appropriately
  useEffect(() => {
    if (isUrdu) {
      // Re-translate content when route changes
      const timer = setTimeout(async () => {
        await translateCurrentPage();
      }, 300); // Small delay to ensure content is loaded

      return () => clearTimeout(timer);
    }
  }, [location.pathname, isUrdu]);

  return (
    <div className="urdu-translation-container">
      <button
        className={isUrdu ? 'urdu-mode' : ''}
        onClick={toggleTranslation}
        disabled={isLoading}
        aria-label={isUrdu ? "Switch back to English" : "Translate to Urdu"}
      >
        {isLoading ? (
          <>
            <span
              style={{
                width: '14px',
                height: '14px',
                border: '2px solid transparent',
                borderTop: '2px solid currentColor',
                borderRight: '2px solid currentColor',
                borderRadius: '50%',
                animation: '1s linear infinite spin',
                display: 'inline-block'
              }}
            ></span>
            <span>ترجمہ ہو رہا ہے...</span>
          </>
        ) : isUrdu ? (
          <span>انگریزی میں واپس جائیں</span>
        ) : (
          <span>اردو میں ترجمہ کریں</span>
        )}
      </button>
    </div>
  );
};

export default UrduTranslateButton;
