import React from "react";
import { Bell, Trash2, X } from "lucide-react";
import { useNotificationStore } from "../store/notificationStore";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = React.useState(false);
  const {
    notifications,
    clearAllNotifications,
    fetchNotifications,
    deleteNotification,
  } = useNotificationStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  // Fetch notifications on component mount, when user changes, and when fetchNotifications changes
  React.useEffect(() => {
    const fetchData = async () => {
      if (user?.uid) {
        try {
          await fetchNotifications();
          // console.log('Notificationsddd:', data);
        } catch (error) {
          console.error("Error fetching notifications:", error);
        }
      }
    };
    
    fetchData();
    // Set up an interval to fetch notifications every minute
    // const interval = setInterval(fetchData, 60000);

    // return () => clearInterval(interval);
  }, [user?.uid, fetchNotifications]);

  // console.log('Notifications:', notifications);

  const toggleNotifications = () => {
    setIsOpen(!isOpen);
  };

  const handleClearNotifications = async () => {
    if (user) {
      await clearAllNotifications(user.uid);
      localStorage.removeItem("notifications");
      setIsOpen(false);
    }
  };

  const handleNotificationClick = async (
    notificationId: string,
    url: string
  ) => {
    navigate(url);
    setIsOpen(false);
    // Remove the notification after clicking
    await deleteNotification(notificationId);
  };

  const formatTimestamp = (date: Date) => {
    if (!date) return "Just now";

    // Ensure we have a Date object
    const dateObj = date instanceof Date ? date : new Date(date);

    const now = new Date();
    const diff = now.getTime() - dateObj.getTime();

    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return "Just now";
  };

  const formatContent = (content: string) => {
    // Replace **text** with bold spans
    return content.split(/(\*\*.*?\*\*)/).map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        // Remove ** and wrap in bold span
        return (
          <span key={index} className="font-bold">
            {part.slice(2, -2)}
          </span>
        );
      }
      return part;
    });
  };

  // const fetchDeadLines = async () => {
  //   try {
  //     const today = new Date();
  //     const todayString = today.toISOString().split("T")[0];
  
  //     console.log("Today:", today);
  
  //     // Fetch all tasks and projects from Firestore
  //     const projectQuery = query(collection(db, "projects"));
  //     const allProjects = (await getDocs(projectQuery)).docs.map((doc) =>
  //       doc.data()
  //     );
  
  //     const taskQuery = query(collection(db, "tasks"));
  //     const allTasks = (await getDocs(taskQuery)).docs.map((doc) => doc.data());
  
  //     // Filter tasks and projects due today
  //     const todayDeadLines = allTasks.filter((task) => {
  //       const deadlineString = task?.deadline?.split("T")[0];
  //       return deadlineString === todayString;
  //     });
  
  //     // const todayProjects = allProjects.filter((project) => {
  //     //   const dueDateString = project?.project_due_date?.split("T")[0];
  //     //   return dueDateString === todayString;
  //     // });
  
  //     // // Create notifications for tasks due today
  //     // const newTaskNotifications = todayDeadLines.map((task) => {
  //     //   const newNoti = {
  //     //     content: `Today is the deadline for ${task.name}`,
  //     //     url: `/projects/${task.projectId}/tasks/${task.id}`,
  //     //     userId: user?.uid || "",
  //     //   };
  
  //     //   const isExisting = notifications.some(
  //     //     (noti) =>
  //     //       noti.content === newNoti.content &&
  //     //       noti.url === newNoti.url &&
  //     //       noti.userId === newNoti.userId &&
  //     //       new Date(noti.createdAt).getDate() === today.getDate()
  //     //   );
  
  //     //   if (isExisting) return null;
  
  //     //   return newNoti;
  //     // });
  
  //     // Create notifications for projects due today
  //     // const newProjectNotifications = todayProjects.map((project) => {
  //     //   const newNoti = {
  //     //     content: `Today is the deadline for project ${project.name}`,
  //     //     url: `/projects/${project.id}`,
  //     //     userId: user?.uid || "",
  //     //   };
  
  //     //   const isExisting = notifications.some(
  //     //     (noti) =>
  //     //       noti.content === newNoti.content &&
  //     //       noti.url === newNoti.url &&
  //     //       noti.userId === newNoti.userId &&
  //     //       new Date(noti.createdAt).getDate() === today.getDate()
  //     //   );
  
  //     //   if (isExisting) return null;
  
  //     //   return newNoti;
  //     // });
  
  //     // Combine task and project notifications
  //     // const allNotifications = [...newTaskNotifications, ...newProjectNotifications].filter(noti => noti !== null);
  
  //     // Add notifications to the database
  //     // for (const notification of allNotifications) {
  //     //   if (notification) {
  //     //     await addNotification(
  //     //       notification.content,
  //     //       notification.url,
  //     //       notification.userId
  //     //     );
  //     //   }
  //     // }
  //   } catch (error) {
  //     console.error("Error fetching today notifications:", error);
  //   }
  // };

  // useEffect(() => {
  //   if (user && notifications && !hasFetched.current) {
  //     hasFetched.current = true;
  //     fetchDeadLines();
  //   }
  // }, [user, notifications]);

  return (
    <div className="relative">
      <button
        onClick={toggleNotifications}
        className="relative p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none"
      >
        <Bell className="h-6 w-6 text-gray-600" />
        {notifications.length > 0 && (
          <span className="absolute top-1 right-1 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
            {notifications.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-50"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="absolute right-4 top-16 w-96 max-h-[80vh] bg-white rounded-xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b bg-gray-50">
              <div>
                <h3 className="font-semibold text-lg text-gray-900">
                  Notifications
                </h3>
                <p className="text-sm text-gray-500">
                  {notifications.length} unread messages
                </p>
              </div>
              <div className="flex gap-2">
                {notifications.length > 0 && (
                  <button
                    className="p-2 text-gray-500 hover:text-red-500 hover:bg-gray-100 rounded-full transition-colors duration-200"
                    onClick={handleClearNotifications}
                    title="Clear all notifications"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                )}
                <button
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Notification List */}
            <div className="overflow-y-auto max-h-[calc(80vh-80px)]">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 px-4">
                  <Bell className="h-12 w-12 text-gray-300 mb-4" />
                  <p className="text-gray-500 text-center">
                    No new notifications
                  </p>
                </div>
              ) : (
                <div className="divide-y">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="p-4 hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                      onClick={() =>
                        handleNotificationClick(
                          notification.id,
                          notification.url
                        )
                      }
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">
                            {formatContent(notification.content)}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {formatTimestamp(notification.createdAt)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
