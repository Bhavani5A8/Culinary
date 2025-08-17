import React, { useState, useEffect } from 'react';
import { X, Loader, AlertCircle, CheckCircle, Info, Sparkles } from 'lucide-react';

// Enhanced Utility Components with Professional Features
export const OptimizedImage = ({ src, alt, className, fallbackSrc, onLoad, onError, priority = false, ...props }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);
  const [isIntersecting, setIsIntersecting] = useState(!priority); // Load immediately if priority
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;
  
  // Enhanced intersection observer for lazy loading
  useEffect(() => {
    if (!src) return; // Guard clause for the hook
    
    if (priority) {
      setIsIntersecting(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    const imageElement = document.querySelector(`[data-image-id="${src}"]`);
    if (imageElement) {
      observer.observe(imageElement);
    }

    return () => observer.disconnect();
  }, [src, priority]);

  // Enhanced error handling and validation - moved after all hooks
  if (!src || !alt) {
    console.error('OptimizedImage: src and alt props are required');
    return (
      <div className={`${className} relative overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center`}>
        <div className="text-center p-4">
          <AlertCircle className="w-8 h-8 text-gray-500 mx-auto mb-2" />
          <span className="text-gray-500 text-sm">Image not available</span>
        </div>
      </div>
    );
  }
  
  const handleLoad = () => {
    try {
      setLoaded(true);
      setError(false);
      setRetryCount(0);
      if (onLoad) onLoad();
    } catch (err) {
      console.error('Error in image load handler:', err);
    }
  };

  const handleError = () => {
    try {
      console.error(`Error loading image: ${currentSrc}`);
      
      // Enhanced retry mechanism
      if (retryCount < maxRetries) {
        setRetryCount(prev => prev + 1);
        setTimeout(() => {
          setCurrentSrc(`${src}?retry=${retryCount + 1}`);
        }, 1000 * (retryCount + 1));
        return;
      }

      // Try fallback image
      if (fallbackSrc && currentSrc !== fallbackSrc) {
        setCurrentSrc(fallbackSrc);
        setRetryCount(0);
        return;
      }

      setError(true);
      setLoaded(false);
      if (onError) onError();
    } catch (err) {
      console.error('Error in image error handler:', err);
    }
  };
  
  return (
    <div 
      className={`${className} relative overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300`}
      data-image-id={src}
    >
      {/* Enhanced loading skeleton */}
      {!loaded && !error && (
        <div className="absolute inset-0">
          <div className="w-full h-full bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-pulse">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse" 
                 style={{ animationDuration: '2s' }}>
            </div>
          </div>
          {/* Enhanced loading indicator */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader className="w-6 h-6 text-gray-400 animate-spin" />
          </div>
        </div>
      )}
      
      {/* Enhanced error state */}
      {error ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
          <div className="text-center p-4">
            <AlertCircle className="w-8 h-8 text-gray-500 mx-auto mb-2" />
            <span className="text-gray-500 text-sm block mb-2">Failed to load image</span>
            <button 
              onClick={() => {
                setError(false);
                setRetryCount(0);
                setCurrentSrc(src);
              }}
              className="text-xs text-blue-600 hover:text-blue-800 transition-colors"
            >
              Try again
            </button>
          </div>
        </div>
      ) : isIntersecting ? (
        <img
          src={currentSrc}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          onLoad={handleLoad}
          onError={handleError}
          className={`w-full h-full object-cover transition-all duration-700 ${
            loaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
          {...props}
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
          <span className="text-gray-500 text-sm">Loading...</span>
        </div>
      )}
    </div>
  );
};

export const Button = ({ 
  children, 
  variant = 'default', 
  size = 'default', 
  className = '', 
  onClick, 
  loading = false, 
  disabled = false, 
  type = 'button',
  pulse = false,
  tooltip = '',
  animation = true,
  ...props 
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const [ripples, setRipples] = useState([]);

  let buttonClasses = 'relative inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/20 disabled:pointer-events-none disabled:opacity-50 overflow-hidden ';
  
  try {
    // Enhanced variant styles with better gradients and shadows
    if (variant === 'primary') {
      buttonClasses += 'bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 text-white shadow-lg hover:shadow-2xl hover:shadow-orange-500/25 ';
    } else if (variant === 'secondary') {
      buttonClasses += 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-2xl hover:shadow-blue-500/25 ';
    } else if (variant === 'outline') {
      buttonClasses += 'border-2 border-gray-300 bg-white/80 backdrop-blur-sm shadow-sm hover:bg-white hover:border-orange-400 hover:shadow-lg text-gray-700 hover:text-orange-600 ';
    } else if (variant === 'ghost') {
      buttonClasses += 'hover:bg-gray-100/80 backdrop-blur-sm text-gray-700 ';
    } else if (variant === 'cta') {
      buttonClasses += 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg hover:shadow-2xl hover:shadow-emerald-500/25 ';
    } else if (variant === 'danger') {
      buttonClasses += 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg hover:shadow-2xl hover:shadow-red-500/25 ';
    } else if (variant === 'success') {
      buttonClasses += 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg hover:shadow-2xl hover:shadow-green-500/25 ';
    } else {
      buttonClasses += 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg hover:shadow-xl ';
    }
    
    // Enhanced size variations
    if (size === 'sm') {
      buttonClasses += 'h-9 px-4 text-xs ';
    } else if (size === 'lg') {
      buttonClasses += 'h-12 px-8 text-base ';
    } else if (size === 'xl') {
      buttonClasses += 'h-14 px-10 text-lg font-bold ';
    } else if (size === 'icon') {
      buttonClasses += 'h-10 w-10 ';
    } else {
      buttonClasses += 'h-11 px-6 py-2 ';
    }
    
    // Enhanced animations
    if (animation && !disabled && !loading) {
      buttonClasses += 'transform-gpu hover:scale-105 active:scale-95 ';
    }
    
    if (pulse) {
      buttonClasses += 'animate-pulse ';
    }
    
    buttonClasses += className;
  } catch (error) {
    console.error('Error building button classes:', error);
    buttonClasses += 'bg-gray-500 text-white px-4 py-2 rounded ';
  }
  
  // Enhanced ripple effect
  const createRipple = (event) => {
    if (!animation || disabled || loading) return;
    
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    const newRipple = {
      x,
      y,
      size,
      id: Date.now(),
    };

    setRipples(prev => [...prev, newRipple]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);
  };
  
  const handleClick = (e) => {
    try {
      createRipple(e);
      
      if (onClick && !loading && !disabled) {
        onClick(e);
      }
    } catch (error) {
      console.error('Error in button click handler:', error);
    }
  };

  const handleMouseDown = () => setIsPressed(true);
  const handleMouseUp = () => setIsPressed(false);
  const handleMouseLeave = () => setIsPressed(false);
  
  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      disabled={loading || disabled}
      title={tooltip}
      {...props}
    >
      {/* Enhanced ripple effects */}
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="absolute bg-white/30 rounded-full pointer-events-none animate-ping"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
            transform: 'scale(0)',
            animation: 'ripple 0.6s linear',
          }}
        />
      ))}
      
      {/* Enhanced loading indicator */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
        </div>
      )}
      
      {/* Enhanced pressed state */}
      {isPressed && animation && (
        <div className="absolute inset-0 bg-black/10 rounded-xl" />
      )}
      
      <span className={`transition-opacity duration-200 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        {children}
      </span>
    </button>
  );
};

export const Input = ({ 
  className = '', 
  icon: Icon, 
  error = '', 
  success = false, 
  label = '', 
  helper = '',
  onFocus,
  onBlur,
  ...props 
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  let inputClasses = 'flex h-12 w-full rounded-xl border-2 transition-all duration-300 bg-white/90 backdrop-blur-sm px-4 py-2 text-sm shadow-lg placeholder:text-gray-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ';
  
  try {
    if (Icon) {
      inputClasses += 'pl-12 ';
    }
    
    if (error) {
      inputClasses += 'border-red-500 focus:border-red-600 focus:shadow-red-500/20 ';
    } else if (success) {
      inputClasses += 'border-green-500 focus:border-green-600 focus:shadow-green-500/20 ';
    } else if (isFocused) {
      inputClasses += 'border-orange-500 focus:shadow-orange-500/20 ';
    } else {
      inputClasses += 'border-gray-300 hover:border-gray-400 ';
    }
    
    if (isFocused || hasValue) {
      inputClasses += 'scale-[1.02] ';
    }
    
    inputClasses += className;
  } catch (err) {
    console.error('Error building input classes:', err);
    inputClasses += 'border-gray-300 ';
  }

  const handleFocus = (e) => {
    try {
      setIsFocused(true);
      if (onFocus) onFocus(e);
    } catch (err) {
      console.error('Error in input focus handler:', err);
    }
  };

  const handleBlur = (e) => {
    try {
      setIsFocused(false);
      setHasValue(!!e.target.value);
      if (onBlur) onBlur(e);
    } catch (err) {
      console.error('Error in input blur handler:', err);
    }
  };
  
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {Icon && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
            <Icon className={`w-5 h-5 transition-colors ${
              error ? 'text-red-500' : 
              success ? 'text-green-500' : 
              isFocused ? 'text-orange-500' : 'text-gray-400'
            }`} />
          </div>
        )}
        
        <input
          className={inputClasses}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={(e) => setHasValue(!!e.target.value)}
          {...props}
        />
        
        {/* Enhanced focus ring */}
        {isFocused && (
          <div className="absolute inset-0 rounded-xl ring-4 ring-orange-500/20 pointer-events-none" />
        )}
        
        {/* Success indicator */}
        {success && !error && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <CheckCircle className="w-5 h-5 text-green-500" />
          </div>
        )}
        
        {/* Error indicator */}
        {error && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <AlertCircle className="w-5 h-5 text-red-500" />
          </div>
        )}
      </div>
      
      {/* Helper text or error message */}
      {(helper || error) && (
        <div className={`text-xs flex items-center gap-1 ${
          error ? 'text-red-600' : 'text-gray-600'
        }`}>
          {error ? (
            <AlertCircle className="w-3 h-3" />
          ) : (
            <Info className="w-3 h-3" />
          )}
          <span>{error || helper}</span>
        </div>
      )}
    </div>
  );
};

export const Modal = ({ 
  isOpen, 
  onClose, 
  children, 
  title, 
  size = 'md',
  closeOnBackdrop = true,
  showCloseButton = true,
  animation = true,
  overlay = 'dark'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    try {
      if (isOpen) {
        setIsVisible(true);
        setIsAnimating(true);
        document.body.style.overflow = 'hidden';
        
        // Enhanced: Focus management
        const focusableElements = document.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        if (firstElement) {
          setTimeout(() => firstElement.focus(), 100);
        }
      } else {
        document.body.style.overflow = 'unset';
        setIsAnimating(false);
        const timer = setTimeout(() => setIsVisible(false), animation ? 300 : 0);
        return () => clearTimeout(timer);
      }
      
      return () => {
        document.body.style.overflow = 'unset';
      };
    } catch (error) {
      console.error('Error managing modal visibility:', error);
    }
  }, [isOpen, animation]);

  // Enhanced keyboard handling
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && onClose) {
        onClose();
      }
      
      // Enhanced: Tab trap
      if (e.key === 'Tab') {
        const focusableElements = Array.from(document.querySelectorAll(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )).filter(el => {
          const rect = el.getBoundingClientRect();
          return rect.width > 0 && rect.height > 0;
        });
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isVisible) return null;

  let sizeClass = '';
  try {
    if (size === 'sm') sizeClass = 'max-w-md';
    else if (size === 'lg') sizeClass = 'max-w-4xl';
    else if (size === 'xl') sizeClass = 'max-w-6xl';
    else if (size === 'full') sizeClass = 'max-w-full mx-4';
    else sizeClass = 'max-w-2xl';
  } catch (error) {
    console.error('Error setting modal size:', error);
    sizeClass = 'max-w-2xl';
  }

  let overlayClass = 'fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 ';
  if (overlay === 'light') {
    overlayClass += 'bg-white/80 ';
  } else if (overlay === 'blur') {
    overlayClass += 'bg-black/50 backdrop-blur-xl ';
  } else {
    overlayClass += 'bg-black/70 backdrop-blur-lg ';
  }

  const handleBackdropClick = (e) => {
    try {
      if (e.target === e.currentTarget && closeOnBackdrop && onClose) {
        onClose();
      }
    } catch (error) {
      console.error('Error handling backdrop click:', error);
    }
  };

  const handleCloseClick = () => {
    try {
      if (onClose) onClose();
    } catch (error) {
      console.error('Error handling close click:', error);
    }
  };

  return (
    <div 
      className={overlayClass}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className={`relative bg-white rounded-2xl shadow-2xl w-full overflow-hidden transition-all duration-300 ${sizeClass} ${
          animation && isAnimating 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-95 translate-y-4'
        }`} 
        style={{maxHeight: '95vh'}}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Enhanced header with gradient and better spacing */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-orange-50 via-pink-50 to-purple-50">
          <h2 
            id="modal-title"
            className="text-2xl font-bold text-gray-900 truncate pr-4 flex items-center gap-3"
          >
            {title && typeof title === 'string' ? (
              <>
                <Sparkles className="w-6 h-6 text-orange-500" />
                {title}
              </>
            ) : (
              title || 'Modal'
            )}
          </h2>
          
          {showCloseButton && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleCloseClick} 
              className="flex-shrink-0 hover:bg-white/80 group"
              tooltip="Close"
            >
              <X className="w-6 h-6 transition-transform group-hover:rotate-90" />
            </Button>
          )}
        </div>
        
        {/* Enhanced content area with better scrolling */}
        <div 
          className="p-6 overflow-y-auto custom-scrollbar" 
          style={{maxHeight: 'calc(95vh - 120px)'}}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

// Enhanced Loading Component
export const Loading = ({ 
  size = 'md', 
  text = '', 
  variant = 'spinner',
  color = 'orange' 
}) => {
  let sizeClass = '';
  let textSizeClass = '';
  
  switch (size) {
    case 'sm':
      sizeClass = 'w-4 h-4';
      textSizeClass = 'text-sm';
      break;
    case 'lg':
      sizeClass = 'w-8 h-8';
      textSizeClass = 'text-lg';
      break;
    case 'xl':
      sizeClass = 'w-12 h-12';
      textSizeClass = 'text-xl';
      break;
    default:
      sizeClass = 'w-6 h-6';
      textSizeClass = 'text-base';
  }

  let colorClass = '';
  switch (color) {
    case 'blue':
      colorClass = 'border-blue-600 border-t-transparent';
      break;
    case 'green':
      colorClass = 'border-green-600 border-t-transparent';
      break;
    case 'red':
      colorClass = 'border-red-600 border-t-transparent';
      break;
    default:
      colorClass = 'border-orange-600 border-t-transparent';
  }

  if (variant === 'dots') {
    return (
      <div className="flex items-center justify-center gap-2">
        <div className="flex space-x-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`${sizeClass} bg-orange-500 rounded-full animate-bounce`}
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
        {text && <span className={`${textSizeClass} text-gray-600 ml-3`}>{text}</span>}
      </div>
    );
  }

  if (variant === 'pulse') {
    return (
      <div className="flex items-center justify-center gap-3">
        <div className={`${sizeClass} bg-orange-500 rounded-full animate-pulse`} />
        {text && <span className={`${textSizeClass} text-gray-600 animate-pulse`}>{text}</span>}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-3">
      <div className={`${sizeClass} border-2 ${colorClass} rounded-full animate-spin`} />
      {text && <span className={`${textSizeClass} text-gray-600`}>{text}</span>}
    </div>
  );
};

// Enhanced Alert Component
export const Alert = ({ 
  type = 'info', 
  title, 
  children, 
  onClose,
  className = '',
  animation = true 
}) => {
  const [isVisible, setIsVisible] = useState(true);

  let alertClasses = 'rounded-xl border p-4 mb-4 transition-all duration-300 ';
  let iconComponent;

  switch (type) {
    case 'error':
      alertClasses += 'bg-red-50 border-red-200 text-red-800 ';
      iconComponent = <AlertCircle className="w-5 h-5 text-red-500" />;
      break;
    case 'success':
      alertClasses += 'bg-green-50 border-green-200 text-green-800 ';
      iconComponent = <CheckCircle className="w-5 h-5 text-green-500" />;
      break;
    case 'warning':
      alertClasses += 'bg-yellow-50 border-yellow-200 text-yellow-800 ';
      iconComponent = <AlertCircle className="w-5 h-5 text-yellow-500" />;
      break;
    default:
      alertClasses += 'bg-blue-50 border-blue-200 text-blue-800 ';
      iconComponent = <Info className="w-5 h-5 text-blue-500" />;
  }

  alertClasses += className;

  const handleClose = () => {
    if (animation) {
      setIsVisible(false);
      setTimeout(() => onClose && onClose(), 300);
    } else {
      onClose && onClose();
    }
  };

  if (!isVisible && animation) {
    alertClasses += 'opacity-0 scale-95 ';
  }

  return (
    <div className={alertClasses}>
      <div className="flex items-start gap-3">
        {iconComponent}
        <div className="flex-1 min-w-0">
          {title && (
            <h4 className="font-semibold mb-1">{title}</h4>
          )}
          <div className="text-sm">{children}</div>
        </div>
        {onClose && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="flex-shrink-0 -mr-2 -mt-2 opacity-70 hover:opacity-100"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

// Enhanced Tooltip Component
export const Tooltip = ({ children, content, position = 'top' }) => {
  const [isVisible, setIsVisible] = useState(false);

  let positionClasses = 'absolute z-50 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg ';
  
  switch (position) {
    case 'bottom':
      positionClasses += 'top-full left-1/2 transform -translate-x-1/2 mt-2 ';
      break;
    case 'left':
      positionClasses += 'right-full top-1/2 transform -translate-y-1/2 mr-2 ';
      break;
    case 'right':
      positionClasses += 'left-full top-1/2 transform -translate-y-1/2 ml-2 ';
      break;
    default:
      positionClasses += 'bottom-full left-1/2 transform -translate-x-1/2 mb-2 ';
  }

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && content && (
        <div className={positionClasses}>
          {content}
        </div>
      )}
    </div>
  );
};

/* Enhanced Custom Scrollbar Styles */
const customScrollbarStyles = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 8px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 4px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: linear-gradient(to bottom, #f97316, #ec4899);
    border-radius: 4px;
    transition: background 0.3s ease;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(to bottom, #ea580c, #db2777);
  }
  
  @keyframes ripple {
    to {
      transform: scale(2);
      opacity: 0;
    }
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = customScrollbarStyles;
  document.head.appendChild(styleElement);
}