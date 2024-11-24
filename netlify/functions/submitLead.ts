import { Handler } from '@netlify/functions'
import { MongoClient, ServerApiVersion } from 'mongodb'

const uri = process.env.MONGODB_URI
const client = new MongoClient(uri!, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
})

const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    }
  }

  try {
    await client.connect()
    const database = client.db('wellsure')
    const collection = database.collection('leads')

    const data = JSON.parse(event.body!)
    const result = await collection.insertOne({
      ...data,
      createdAt: new Date()
    })

    return {
      statusCode: 201,
      body: JSON.stringify({ 
        message: 'Lead submitted successfully',
        id: result.insertedId 
      })
    }
  } catch (error) {
    console.error('Database error:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to submit lead' })
    }
  } finally {
    await client.close()
  }
}

export { handler }