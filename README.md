# CDN Prototype

This project is a simple prototype of a Content Delivery Network (CDN) using Node.js. It demonstrates the basic functionality of a CDN, including caching content at an edge server and fetching data from the origin server when necessary.

---

## **Project Structure**

```
cdn-prototype/
├── static/               # Directory for static files served by the origin server
│   ├── index.html        # Example HTML file
│   ├── style.css         # Example CSS file
│   ├── script.js         # Example JavaScript file
│   └── image.png         # Example image file
├── cdn-server.js         # CDN edge server (handles caching and requests)
├── origin-server.js      # Origin server (serves static files)
├── package.json          # Node.js project configuration
├── package-lock.json     # Dependency lock file (auto-generated)
└── README.md             # Description of the project
```

---

## **How It Works**

1. **Origin Server**

   - The origin server serves static content from the `static/` folder.
   - Listens on `http://localhost:4000`.

2. **CDN Edge Server**
   - The CDN server acts as a caching layer.
   - When a client requests content:
     - If the content is in the cache (**cache hit**), it is served directly.
     - If the content is not in the cache (**cache miss**), it is fetched from the origin server, cached, and then served.
   - Listens on `http://localhost:3000`.

---

## **Setup Instructions**

### **1. Install Dependencies**

Make sure you have Node.js installed. Then, run:

```bash
npm install
```

### **2. Start the Origin Server**

Run the following command to start the origin server:

```bash
node origin-server.js
```

The origin server will run at `http://localhost:4000`.

### **3. Start the CDN Edge Server**

Run the following command to start the CDN edge server:

```bash
node cdn-server.js
```

The CDN server will run at `http://localhost:3000`.

### **4. Test the Prototype**

- Open a browser and visit `http://localhost:3000`.
- The `index.html` file will be loaded, and other assets (e.g., `style.css`, `script.js`, `image.png`) will be served via the CDN server.

---

## **Key Features**

- **Cache Management**:

  - Uses `node-cache` for in-memory caching.
  - Cache Time-To-Live (TTL) is set to 60 seconds by default.

- **Cache Hit/Miss Handling**:

  - Logs to the console whether a request resulted in a cache hit or miss.

- **Static File Delivery**:
  - Serves static files (HTML, CSS, JS, images) from the origin server or cache.

---

## **Customization**

### **1. Adjust Cache TTL**

Modify the TTL value in `cdn-server.js`:

```javascript
const cache = new NodeCache({ stdTTL: 60 }); // TTL in seconds
```

### **2. Add More Static Files**

Place additional static files (e.g., more images, videos) in the `static/` folder. Update `index.html` to include links to these files.

---

## **Future Enhancements**

- Add support for distributed caching across multiple edge servers.
- Implement cache invalidation using surrogate keys.

---

## **Troubleshooting**

### **Error: `Cannot set headers after they are sent to the client`**

This occurs when multiple responses are sent for a single request. Ensure `res.send` or `res.end` is called only once in the route handler.

### **Image Not Loading**

- Verify the image path in `index.html`.
- Ensure the origin server correctly serves the image.

---

## **License**

This project is open-source and free to use for learning and experimentation.
