import React, { useState, useEffect } from 'react';
import { Search, Upload, Download, Filter, FileText, User, Tag, Calendar, TrendingUp, Star } from 'lucide-react';

// Mock data for demonstration
const mockPapers = [
  {
    id: 1,
    title: "Deep Learning Applications in Natural Language Processing",
    author: "Dr. Sarah Johnson",
    category: "AI",
    uploadDate: "2024-01-15",
    downloads: 234,
    fileSize: "2.3 MB",
    abstract: "This paper explores the latest applications of deep learning in NLP, focusing on transformer architectures and their impact on language understanding."
  },
  {
    id: 2,
    title: "Quantum Computing: Theory and Practical Applications",
    author: "Prof. Michael Chen",
    category: "Physics",
    uploadDate: "2024-01-12",
    downloads: 189,
    fileSize: "3.1 MB",
    abstract: "A comprehensive review of quantum computing principles and their real-world applications in cryptography and optimization."
  },
  {
    id: 3,
    title: "CRISPR-Cas9 Gene Editing: Recent Advances and Ethical Considerations",
    author: "Dr. Emily Rodriguez",
    category: "Biology",
    uploadDate: "2024-01-10",
    downloads: 167,
    fileSize: "1.8 MB",
    abstract: "An analysis of recent CRISPR-Cas9 developments and the ethical frameworks surrounding gene editing technologies."
  },
  {
    id: 4,
    title: "Machine Learning in Healthcare: Diagnostic Applications",
    author: "Dr. James Wilson",
    category: "AI",
    uploadDate: "2024-01-08",
    downloads: 145,
    fileSize: "2.7 MB",
    abstract: "This study examines how machine learning algorithms are revolutionizing medical diagnostics and patient care."
  },
  {
    id: 5,
    title: "Climate Change Modeling: Statistical Approaches",
    author: "Dr. Lisa Thompson",
    category: "Environmental Science",
    uploadDate: "2024-01-05",
    downloads: 123,
    fileSize: "4.2 MB",
    abstract: "Statistical models for predicting climate change patterns and their accuracy in long-term forecasting."
  },
  {
    id: 6,
    title: "Blockchain Technology in Supply Chain Management",
    author: "Prof. Robert Anderson",
    category: "Technology",
    uploadDate: "2024-01-03",
    downloads: 98,
    fileSize: "2.9 MB",
    abstract: "Exploring how blockchain technology can improve transparency and efficiency in global supply chains."
  }
];

const categories = ["All", "AI", "Physics", "Biology", "Chemistry", "Environmental Science", "Technology"];

export default function ResearchPaperManager() {
  const [papers, setPapers] = useState(mockPapers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [filteredPapers, setFilteredPapers] = useState(mockPapers);
  const [newPaper, setNewPaper] = useState({
    title: '',
    author: '',
    category: 'AI',
    abstract: ''
  });

  // Filter papers based on search term and category
  useEffect(() => {
    let filtered = papers;
    
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(paper => paper.category === selectedCategory);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(paper => 
        paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        paper.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        paper.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredPapers(filtered);
  }, [searchTerm, selectedCategory, papers]);

  const handleUpload = () => {
    if (newPaper.title && newPaper.author) {
      const paper = {
        id: papers.length + 1,
        ...newPaper,
        uploadDate: new Date().toISOString().split('T')[0],
        downloads: 0,
        fileSize: "2.1 MB" // Mock file size
      };
      setPapers([paper, ...papers]);
      setNewPaper({ title: '', author: '', category: 'AI', abstract: '' });
      setShowUploadModal(false);
    }
  };

  const handleDownload = (paperId) => {
    setPapers(papers.map(paper => 
      paper.id === paperId 
        ? { ...paper, downloads: paper.downloads + 1 }
        : paper
    ));
    // Simulate download
    alert('Download started! (This is a simulation)');
  };

  const topPapers = papers.sort((a, b) => b.downloads - a.downloads).slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Research Paper Management System</h1>
              <p className="text-gray-600 mt-2">Centralized platform for managing and accessing academic research papers</p>
            </div>
            <button
              onClick={() => setShowUploadModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Upload size={20} />
              Upload Paper
            </button>
          </div>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Papers</p>
                <p className="text-2xl font-bold text-gray-900">{papers.length}</p>
              </div>
              <FileText className="text-blue-600" size={24} />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Downloads</p>
                <p className="text-2xl font-bold text-gray-900">{papers.reduce((sum, paper) => sum + paper.downloads, 0)}</p>
              </div>
              <Download className="text-green-600" size={24} />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Categories</p>
                <p className="text-2xl font-bold text-gray-900">{categories.length - 1}</p>
              </div>
              <Tag className="text-purple-600" size={24} />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Active Users</p>
                <p className="text-2xl font-bold text-gray-900">127</p>
              </div>
              <User className="text-orange-600" size={24} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Search and Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Search & Filter</h3>
              
              {/* Search Bar */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search papers, authors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Category Filter */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div className="text-sm text-gray-600">
                Showing {filteredPapers.length} of {papers.length} papers
              </div>
            </div>

            {/* Top Downloaded Papers */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp size={20} className="text-green-600" />
                Most Downloaded
              </h3>
              <div className="space-y-3">
                {topPapers.map((paper, index) => (
                  <div key={paper.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{paper.title}</p>
                      <p className="text-xs text-gray-600">{paper.downloads} downloads</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Papers List */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Research Papers</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {filteredPapers.map(paper => (
                  <div key={paper.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h4 className="text-xl font-semibold text-gray-900 mb-2">{paper.title}</h4>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                          <span className="flex items-center gap-1">
                            <User size={16} />
                            {paper.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <Tag size={16} />
                            {paper.category}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar size={16} />
                            {paper.uploadDate}
                          </span>
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed mb-3">{paper.abstract}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>{paper.fileSize}</span>
                          <span>{paper.downloads} downloads</span>
                        </div>
                      </div>
                      <div className="ml-6 flex-shrink-0">
                        <button
                          onClick={() => handleDownload(paper.id)}
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                        >
                          <Download size={16} />
                          Download PDF
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Upload Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl m-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Upload Research Paper</h2>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                {/* File Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">PDF File</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="mx-auto text-gray-400 mb-2" size={24} />
                    <p className="text-gray-600">Drag and drop your PDF here, or click to select</p>
                    <p className="text-xs text-gray-500 mt-1">Maximum file size: 10MB</p>
                  </div>
                </div>

                {/* Paper Details */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                  <input
                    type="text"
                    value={newPaper.title}
                    onChange={(e) => setNewPaper({...newPaper, title: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter paper title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Author *</label>
                  <input
                    type="text"
                    value={newPaper.author}
                    onChange={(e) => setNewPaper({...newPaper, author: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter author name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                  <select
                    value={newPaper.category}
                    onChange={(e) => setNewPaper({...newPaper, category: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {categories.slice(1).map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Abstract</label>
                  <textarea
                    value={newPaper.abstract}
                    onChange={(e) => setNewPaper({...newPaper, abstract: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows="4"
                    placeholder="Enter paper abstract (optional)"
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpload}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Upload Paper
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}