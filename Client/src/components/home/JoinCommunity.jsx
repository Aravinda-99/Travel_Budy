import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Camera, Share2, MessageSquare, Users } from 'lucide-react';

const JoinCommunity = () => {
  const features = [
    {
      icon: <Camera className="h-6 w-6 text-primary-600" />,
      title: 'Share Your Journey',
      description: 'Post photos and stories from your adventures, showcasing the beautiful destinations you visit.'
    },
    {
      icon: <Share2 className="h-6 w-6 text-primary-600" />,
      title: 'Discover Places',
      description: 'Find hidden gems and popular destinations through recommendations from fellow travelers.'
    },
    {
      icon: <MessageSquare className="h-6 w-6 text-primary-600" />,
      title: 'Connect & Comment',
      description: 'Engage with other travelers through comments, tips, and conversation about their experiences.'
    },
    {
      icon: <Users className="h-6 w-6 text-primary-600" />,
      title: 'Join a Global Community',
      description: 'Become part of a worldwide network of passionate travelers sharing their unique perspectives.'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-primary-50 to-accent-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Join Our Travel Community
          </h2>
          <p className="text-lg text-gray-600">
            Connect with travelers from around the world, share your experiences, 
            and discover new destinations through authentic stories and recommendations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="bg-primary-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-center mt-16"
        >
          <Link 
            to="/signup" 
            className="btn btn-primary py-3 px-8 text-base rounded-full inline-block"
          >
            Join Travel Buddy Today
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default JoinCommunity;