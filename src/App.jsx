import React, { useEffect, useRef, useState } from "react";



import JsonEditor from "react-json-editor-ui";

const App = () => {
  const [editObject, setEditObject] = useState({
  "company": {
    "name": "Tech Innovations Inc.",
    "founded": 2010,
    "employees": [
      {
        "id": 1,
        "name": "John Doe",
        "position": "CEO",
        "contact": {
          "email": "john.doe@techinnovations.com",
          "phone": "+1-555-0100"
        },
        "skills": ["leadership", "strategic planning", "public speaking"],
        "projects": [
          {
            "name": "Project Phoenix",
            "deadline": "2026-12-31",
            "budget": 1500000,
            "team": [
              {
                "id": 3,
                "name": "Alice Smith",
                "role": "Lead Developer"
              },
              {
                "id": 4,
                "name": "Bob Johnson",
                "role": "QA Engineer"
              }
            ]
          }
        ]
      },
      {
        "id": 2,
        "name": "Jane Williams",
        "position": "CTO",
        "contact": {
          "email": "jane.williams@techinnovations.com",
          "phone": "+1-555-0101"
        },
        "skills": ["software architecture", "cloud computing", "cybersecurity"],
        "projects": []
      }
    ],
    "offices": [
      {
        "location": "New York",
        "address": {
          "street": "100 Main St",
          "city": "New York",
          "state": "NY",
          "zip": "10001"
        },
        "capacity": 200
      },
      {
        "location": "San Francisco",
        "address": {
          "street": "200 Market St",
          "city": "San Francisco",
          "state": "CA",
          "zip": "94105"
        },
        "capacity": 150
      }
    ],
    "financials": {
      "year": 2024,
      "revenue": 25000000,
      "expenses": {
        "r&d": 5000000,
        "marketing": 3000000,
        "operations": 7000000
      },
      "netIncome": 10000000
    },
    "products": [
      {
        "id": "p1",
        "name": "InnovateX Platform",
        "category": "Software",
        "versions": [
          {
            "version": "1.0",
            "releaseDate": "2020-05-01",
            "features": [
              "User management",
              "API integrations",
              "Reporting dashboard"
            ]
          },
          {
            "version": "2.0",
            "releaseDate": "2022-11-15",
            "features": [
              "AI-powered analytics",
              "Mobile app support",
              "Enhanced security"
            ]
          }
        ]
      },
      {
        "id": "p2",
        "name": "SecureNet",
        "category": "Cybersecurity",
        "versions": [
          {
            "version": "3.2",
            "releaseDate": "2023-07-22",
            "features": [
              "Real-time threat detection",
              "VPN support",
              "Multi-factor authentication"
            ]
          }
        ]
      }
    ]
  }
}
 );
  const [editorKey, setEditorKey] = useState(0);
  const jsonBridgeRef = useRef(null);

  React.useEffect(() => {
    window.getJsonFromReact = () => {
      return editObject;
    };
  }, [editObject]);



  useEffect(() => {
    window.setJsonFromOutside = (data) => {
      try {
        if (typeof data === "string") {
          data = JSON.parse(data);
        }

        setEditObject(data);

        setEditorKey((prev) => prev + 1);

        console.log("✅ JSON updated from outside:", data);
      } catch (e) {
        console.error("❌ Invalid JSON passed to setJsonFromOutside", e);
      }
    };
  }, []);



  // DOM → React: check for manual changes (polling or event)



  useEffect(() => {
    const interval = setInterval(() => {
      try {
        const raw = jsonBridgeRef.current?.value;



        const parsed = JSON.parse(raw);



        setEditObject(parsed);
      } catch (e) {
        // Ignore invalid JSON
      }
    }, 1000); // check every second



    return () => clearInterval(interval);
  }, []);



  return (
    <div>
      <JsonEditor
        key={editorKey}
        data={editObject}
        onChange={(data) => setEditObject(data)}
        optionsMap={{
          color: [
            { value: "red", label: "Red" },



            { value: "blue", label: "Blue" },
          ],



          city: [
            { value: "beijing", label: "Beijing" },



            { value: "shanghai", label: "Shanghai" },
          ],
        }}
      />



      {/* Hidden or visible element as a bridge */}



      <textarea
        id="json-bridge"
        ref={jsonBridgeRef}
        style={{ display: "none" }}
      />
    </div>
  );
};



export default App; 