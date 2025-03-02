// وظائف تشغيل عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // تفعيل الوضع الداكن إذا كان مخزنًا
    initDarkMode();
    
    // تفعيل تشغيل الفيديو التلقائي
    initVideoAutoplay();
    
    // تفعيل التمرير السلس
    initSmoothScrolling();
    
    // التحقق مما إذا كانت الصفحة الحالية هي صفحة إدارة المسوقين
    const isAgentsPage = document.querySelector('.agents-table') !== null;
    
    if (isAgentsPage) {
        setupEditButtons();
    }
});

// وظيفة تهيئة الوضع الداكن
function initDarkMode() {
    // التحقق مما إذا كان المستخدم قد اختار الوضع الداكن سابقًا
    const isDarkMode = localStorage.getItem('darkMode') === 'enabled';
    
    // تطبيق الوضع الداكن إذا كان مفعلًا
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        
        // تحديث حالة مفتاح التبديل في صفحة الملف الشخصي إذا كان موجودًا
        const darkModeToggle = document.querySelector('#darkModeToggle');
        if (darkModeToggle) {
            darkModeToggle.checked = true;
        }
    }
    
    // إضافة زر تبديل الوضع الداكن في الزاوية العلوية
    addDarkModeToggle();
}

// إضافة زر تبديل الوضع الداكن
function addDarkModeToggle() {
    // إنشاء زر التبديل
    const toggleButton = document.createElement('button');
    toggleButton.className = 'dark-mode-toggle';
    toggleButton.innerHTML = '<i class="fas fa-moon"></i>';
    toggleButton.title = 'تبديل الوضع الداكن';
    
    // تحديث أيقونة الزر بناءً على الوضع الحالي
    if (document.body.classList.contains('dark-mode')) {
        toggleButton.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    // إضافة نمط للزر
    toggleButton.style.position = 'fixed';
    toggleButton.style.top = '15px';
    toggleButton.style.left = '15px';
    toggleButton.style.zIndex = '1000';
    toggleButton.style.background = 'var(--card-bg-color)';
    toggleButton.style.border = 'none';
    toggleButton.style.borderRadius = '50%';
    toggleButton.style.width = '40px';
    toggleButton.style.height = '40px';
    toggleButton.style.boxShadow = '0 2px 5px var(--shadow-color)';
    toggleButton.style.cursor = 'pointer';
    toggleButton.style.color = 'var(--primary-color)';
    toggleButton.style.fontSize = '18px';
    toggleButton.style.display = 'flex';
    toggleButton.style.alignItems = 'center';
    toggleButton.style.justifyContent = 'center';
    toggleButton.style.transition = 'all 0.3s ease';
    
    // إضافة حدث النقر
    toggleButton.addEventListener('click', function() {
        toggleDarkMode();
        
        // تحديث أيقونة الزر
        if (document.body.classList.contains('dark-mode')) {
            this.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            this.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });
    
    // إضافة الزر إلى الصفحة
    document.body.appendChild(toggleButton);
}

// وظيفة تبديل الوضع الداكن
function toggleDarkMode() {
    if (document.body.classList.contains('dark-mode')) {
        // تعطيل الوضع الداكن
        document.body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'disabled');
        
        // تحديث حالة مفتاح التبديل في صفحة الملف الشخصي إذا كان موجودًا
        const darkModeToggle = document.querySelector('#darkModeToggle');
        if (darkModeToggle) {
            darkModeToggle.checked = false;
        }
    } else {
        // تفعيل الوضع الداكن
        document.body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'enabled');
        
        // تحديث حالة مفتاح التبديل في صفحة الملف الشخصي إذا كان موجودًا
        const darkModeToggle = document.querySelector('#darkModeToggle');
        if (darkModeToggle) {
            darkModeToggle.checked = true;
        }
    }
}

// وظيفة تهيئة تشغيل الفيديو التلقائي
function initVideoAutoplay() {
    // البحث عن جميع عناصر الفيديو في الصفحة
    const videos = document.querySelectorAll('video');
    
    // إعداد مراقب التقاطع لتشغيل الفيديو عندما يكون مرئيًا
    if (videos.length > 0 && 'IntersectionObserver' in window) {
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // تشغيل الفيديو عندما يكون مرئيًا
                    entry.target.play();
                } else {
                    // إيقاف الفيديو عندما يكون غير مرئي
                    entry.target.pause();
                }
            });
        }, { threshold: 0.6 }); // تشغيل عندما يكون 60% من الفيديو مرئيًا
        
        // مراقبة جميع عناصر الفيديو
        videos.forEach(video => {
            videoObserver.observe(video);
        });
    }
}

// وظيفة تهيئة التمرير السلس
function initSmoothScrolling() {
    // تطبيق التمرير السلس على جميع الروابط الداخلية
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// وظيفة إعداد أزرار التعديل للمسوقين
function setupEditButtons() {
    // البحث عن جميع أزرار التعديل في الجدول
    const editButtons = document.querySelectorAll('.edit-agent-btn');
    
    // إضافة حدث النقر لكل زر
    editButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // الحصول على معرّف المسوق من خاصية البيانات
            const agentId = this.dataset.agentId;
            
            // الحصول على معلومات المسوق من عنصر البيانات المخفي
            const agentData = JSON.parse(document.getElementById('agent-data-' + agentId).textContent);
            
            // ملء النموذج بالبيانات الحالية
            document.getElementById('edit-agent-id').value = agentId;
            document.getElementById('edit-agent-name').value = agentData.name;
            document.getElementById('edit-agent-email').value = agentData.email;
            document.getElementById('edit-agent-phone').value = agentData.phone;
            document.getElementById('edit-agent-status').value = agentData.status;
            
            // فتح النافذة المنبثقة للتعديل
            const editModal = new bootstrap.Modal(document.getElementById('editAgentModal'));
            editModal.show();
        });
    });
    
    // إعداد أزرار إيقاف/تفعيل المسوق
    const toggleButtons = document.querySelectorAll('.toggle-agent-btn');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // الحصول على معرّف المسوق وحالته الحالية
            const agentId = this.dataset.agentId;
            const currentStatus = this.dataset.status;
            
            // تغيير النص واللون بناءً على الحالة الحالية
            if (currentStatus === 'active') {
                // تأكيد إيقاف المسوق
                if (confirm('هل أنت متأكد من رغبتك في إيقاف هذا المسوق؟')) {
                    // إرسال طلب لتحديث حالة المسوق
                    updateAgentStatus(agentId, 'inactive');
                }
            } else {
                // تأكيد تفعيل المسوق
                if (confirm('هل تريد إعادة تفعيل هذا المسوق؟')) {
                    // إرسال طلب لتحديث حالة المسوق
                    updateAgentStatus(agentId, 'active');
                }
            }
        });
    });
}

// وظيفة لتحديث حالة المسوق
function updateAgentStatus(agentId, newStatus) {
    // إنشاء بيانات الطلب
    const formData = new FormData();
    formData.append('agent_id', agentId);
    formData.append('status', newStatus);
    
    // إرسال طلب AJAX لتحديث حالة المسوق
    fetch('/update_agent_status', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // تحديث واجهة المستخدم بعد نجاح التحديث
            const button = document.querySelector(`.toggle-agent-btn[data-agent-id="${agentId}"]`);
            const statusCell = document.querySelector(`#agent-status-${agentId}`);
            
            // تحديث نص الزر
            if (newStatus === 'active') {
                button.textContent = 'إيقاف';
                button.classList.remove('btn-success');
                button.classList.add('btn-danger');
                button.dataset.status = 'active';
                
                // تحديث خلية الحالة
                statusCell.textContent = 'نشط';
                statusCell.classList.remove('text-danger');
                statusCell.classList.add('text-success');
            } else {
                button.textContent = 'تفعيل';
                button.classList.remove('btn-danger');
                button.classList.add('btn-success');
                button.dataset.status = 'inactive';
                
                // تحديث خلية الحالة
                statusCell.textContent = 'متوقف';
                statusCell.classList.remove('text-success');
                statusCell.classList.add('text-danger');
            }
            
            // عرض رسالة نجاح
            alert('تم تحديث حالة المسوق بنجاح');
        } else {
            // عرض رسالة خطأ
            alert('حدث خطأ أثناء تحديث حالة المسوق');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('حدث خطأ أثناء الاتصال بالخادم');
    });
}
