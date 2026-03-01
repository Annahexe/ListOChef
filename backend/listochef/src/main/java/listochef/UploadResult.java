package listochef;

public class UploadResult {
	  private String imageUrl;
	  private String imageKey;

	  public UploadResult() {}

	  public UploadResult(String imageUrl, String imageKey) {
	    this.imageUrl = imageUrl;
	    this.imageKey = imageKey;
	  }

	  public String getImageUrl() {
	    return imageUrl;
	  }

	  public void setImageUrl(String imageUrl) {
	    this.imageUrl = imageUrl;
	  }

	  public String getImageKey() {
	    return imageKey;
	  }

	  public void setImageKey(String imageKey) {
	    this.imageKey = imageKey;
	  }
	}