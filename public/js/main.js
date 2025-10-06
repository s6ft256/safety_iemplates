// Simple search and filter functionality
document.addEventListener('DOMContentLoaded', function() {
    const templatesGrid = document.querySelector('.templates-grid');
    if (!templatesGrid) return;

    // Create filter and search container
    const controlsContainer = document.createElement('div');
    controlsContainer.className = 'controls-container';
    
    // Search input
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search templates...';
    searchInput.className = 'search-input';
    
    // Category filter
    const categories = ['All', 'Safety', 'Inspection', 'Risk', 'Training', 'Audit'];
    const filterContainer = document.createElement('div');
    filterContainer.className = 'filter-container';
    filterContainer.innerHTML = '<h3>Filter by Category:</h3>' + categories.map(cat => 
        `<button class="filter-btn" data-category="${cat}">${cat}</button>`
    ).join('');
    
    controlsContainer.appendChild(searchInput);
    controlsContainer.appendChild(filterContainer);
    templatesGrid.parentNode.insertBefore(controlsContainer, templatesGrid);

    // Filter and search function
    function filterTemplates() {
        const searchTerm = searchInput.value.toLowerCase();
        const activeCategory = document.querySelector('.filter-btn.active')?.dataset.category || 'All';
        
        document.querySelectorAll('.template-card').forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            const category = card.dataset.category;
            const tags = card.dataset.tags.toLowerCase();
            
            const matchesSearch = searchTerm === '' || 
                title.includes(searchTerm) || 
                description.includes(searchTerm) || 
                tags.includes(searchTerm);
            const matchesCategory = activeCategory === 'All' || category === activeCategory;
            
            card.style.display = matchesSearch && matchesCategory ? 'block' : 'none';
        });
    }

    // Event listeners
    searchInput.addEventListener('input', filterTemplates);
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            filterTemplates();
        });
    });

    // Set 'All' as active by default
    document.querySelector('.filter-btn[data-category="All"]').classList.add('active');

    // Analytics for downloads
    document.addEventListener('click', function(e) {
        if (e.target.matches('a[download]')) {
            // Google Analytics event
            if (typeof gtag !== 'undefined') {
                gtag('event', 'download', {
                    event_category: 'template',
                    event_label: e.target.href
                });
            }
        }
    });
});

// Add some CSS for controls
const style = document.createElement('style');
style.textContent = `
.controls-container {
    margin-bottom: 2rem;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    align-items: center;
}
.search-input {
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 0.375rem;
    flex: 1;
    min-width: 200px;
}
.filter-container {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    align-items: center;
}
.filter-container h3 {
    margin: 0 1rem 0 0;
    font-size: 1rem;
}
.filter-btn {
    margin: 0;
    padding: 0.5rem 1rem;
    background: #f8f9fa;
    border: 1px solid #ddd;
    border-radius: 0.375rem;
    cursor: pointer;
}
.filter-btn.active {
    background: #007bff;
    color: white;
    border-color: #007bff;
}
.tags {
    margin: 1rem 0;
}
.tag {
    display: inline-block;
    background: #e9ecef;
    padding: 0.25rem 0.5rem;
    margin: 0.25rem;
    border-radius: 0.25rem;
    font-size: 0.875rem;
}
.template-meta {
    margin: 1rem 0;
}
.template-meta span {
    margin-right: 1rem;
    font-weight: bold;
}
.card-actions {
    display: flex;
    gap: 0.5rem;
    margin-top: 1rem;
}
.btn-secondary {
    background: #6c757d;
    color: white;
}
.btn-secondary:hover {
    background: #5a6268;
}
`;
document.head.appendChild(style);