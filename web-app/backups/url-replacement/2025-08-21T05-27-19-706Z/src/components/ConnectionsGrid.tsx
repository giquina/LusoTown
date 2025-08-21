'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Connection } from '@/context/NetworkingContext'
import ConnectionCard from '@/components/ConnectionCard'

interface ConnectionsGridProps {
  connections: Connection[]
}

export default function ConnectionsGrid({ connections }: ConnectionsGridProps) {
  return (
    <motion.div
      layout
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
    >
      <AnimatePresence>
        {connections.map((connection, index) => (
          <motion.div
            key={connection.id}
            layout
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              transition: { 
                duration: 0.3, 
                delay: index * 0.1 
              }
            }}
            exit={{ 
              opacity: 0, 
              y: -20, 
              scale: 0.9,
              transition: { duration: 0.2 }
            }}
            whileHover={{ 
              y: -2,
              transition: { duration: 0.2 }
            }}
          >
            <ConnectionCard connection={connection} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  )
}